import websocket from 'utils/websocket';
import auth from 'utils/auth';

import {
  addRemoteConnection,
  updateRemoteConnection,
  removeRemoteConnection,
} from 'actions/conference';

const sdpConstraints = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
  }
};

const peersStore = {
  dispatch: null,
  localId: null,
  localStream: null,
  connections: {},
  remoteStreams: {},
};

const init = (dispatch) => {
  peersStore.dispatch = dispatch;
};

const cleanup = () => {
  peersStore.localStream = null;

  Object.keys(peersStore.connections).forEach((remoteId) => {
    destroyConnection(remoteId);
  });

  peersStore.connections = {};
  peersStore.remoteStreams = {};
};

const setLocalStream = (stream) => {
  peersStore.localStream = stream;
};

const setLocalId = (id) => {
  peersStore.localId = id;
};

const createPeerConnection = (remoteId, iceServers) => {
  const pc = new RTCPeerConnection({ iceServers });

  peersStore.connections[remoteId] = pc;

  peersStore.dispatch(addRemoteConnection({ id: remoteId }))

  if (peersStore.localStream) {
    if (pc.addTrack) {
      peersStore.localStream.getTracks().forEach((track) => {
        pc.addTrack(track, peersStore.localStream);
      });
    }
    else {
      pc.addStream(peersStore.localStream);
    }
  }

  pc.oniceconnectionstatechange = (event) => {
    console.log('ice connection state change', pc.iceConnectionState);

    // TODO: handle connection errors
    switch (pc.iceConnectionState) {
      case 'connected':
        peersStore.dispatch(updateRemoteConnection({ id: remoteId, loading: false }));
        break;
      case 'new':
      case 'checking':
      case 'completed':
      case 'failed':
      case 'disconnected':
      case 'closed':
      default:
        break;
    }
  };

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      websocket().emit('webrtc', JSON.stringify({
        type: 'new-ice-candidate',
        sender: peersStore.localId,
        receiver: remoteId,
        candidate: event.candidate,
      }));
    }
  };

  pc.onnegotiationneeded = (event) => {
    // TODO: deal with peer connection negotiation
    // createOffer(remoteId);
    console.log('peer connection negotiation needed');
  };

  if (pc.addTrack) {
    pc.ontrack = (event) => {
      const stream = event.streams[0];
      peersStore.remoteStreams[remoteId] = stream;
      peersStore.dispatch(updateRemoteConnection({ id: remoteId, stream }));
    };
  }
  else {
    pc.onaddstream = (event) => {
      const { stream } = event;
      peersStore.remoteStreams[remoteId] = stream;
      peersStore.dispatch(updateRemoteConnection({ id: remoteId, stream }));
    };
  }

  return pc;
};

const getPeerConnection = (remoteId) => {
  if (remoteId in peersStore.connections) {
    return new Promise(resolve => resolve(peersStore.connections[remoteId]));
  }
  else {
    return auth.fetch(peersStore.localId)
      .then(iceServers => {
        return createPeerConnection(remoteId, iceServers);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }
};

const destroyConnection = (remoteId) => {
  const remoteConnection = peersStore.connections[remoteId];
  const remoteStream = peersStore.remoteStreams[remoteId];

  peersStore.dispatch(removeRemoteConnection({ id: remoteId }));

  if (remoteStream) {
    remoteStream.getTracks().forEach((track) => track.stop());
  }

  if (remoteConnection) {
    remoteConnection.onaddstream = null;
    remoteConnection.onremovestream = null;
    remoteConnection.onnicecandidate = null;
    remoteConnection.oniceconnectionstatechange = null;
    remoteConnection.onsignalingstatechange = null;
    remoteConnection.onicegatheringstatechange = null;
    remoteConnection.onnegotiationneeded = null;

    remoteConnection.close();
  }
};

const createOffer = (remoteId) => {
  const remoteConnection = peersStore.connections[remoteId];

  if (remoteConnection) {
    remoteConnection.createOffer(sdpConstraints)
      .then((offer) => ( remoteConnection.setLocalDescription(offer) ))
      .then(() => {
        console.log('sending video offer to', remoteId);
        websocket().emit('webrtc', JSON.stringify({
          type: 'video-offer',
          sender: peersStore.localId,
          receiver: remoteId,
          sdp: remoteConnection.localDescription,
        }));
      })
      .catch((desc) => {
        console.log('handle client join error:', desc);
      });
  }
};

const handleClientJoined = (client) => {
  const remoteId = client.id;

  console.log('client joined', remoteId);

  getPeerConnection(remoteId)
    .then(remoteConnection => {
      if (!remoteConnection) {
        console.log('remote connection creation error');
        return;
      }

      createOffer(remoteId);
    });
};

const handleClientLeft = (client) => {
  const remoteId = client.id;

  console.log('client left', remoteId);

  destroyConnection(remoteId);

  delete peersStore.remoteStreams[remoteId];
  delete peersStore.connections[remoteId];
};

const handleWebRTCMessage = (message) => {
  const { type, sender, receiver, sdp, candidate  } = JSON.parse(message);

  var remoteConnection = null;

  switch (type) {
    case 'video-offer':
      console.log('video offer received from', sender);

      getPeerConnection(sender)
        .then(remoteConnection => {
          if (!remoteConnection) {
            console.log('remote connection creation error');
            return;
          }

          remoteConnection.setRemoteDescription(new RTCSessionDescription(sdp))
            .then(() => ( remoteConnection.createAnswer(sdpConstraints) ))
            .then((answer) => remoteConnection.setLocalDescription(answer))
            .then(() => {
              console.log('sending video answer to', sender);
              websocket().emit('webrtc', JSON.stringify({
                type: 'video-answer',
                sender: peersStore.localId,
                receiver: sender,
                sdp: remoteConnection.localDescription,
              }));
            })
            .catch((error) => {
              console.log('video offer error:', error);
            });
        });

      break;
    case 'video-answer':
      console.log('video answer received from', sender);
      remoteConnection = peersStore.connections[sender];
      if (remoteConnection) {
        remoteConnection.setRemoteDescription(new RTCSessionDescription(sdp))
          .then(() => {
            peersStore.dispatch(updateRemoteConnection({ id: sender, loading: false }));
          })
          .catch((error) => {
            console.log('video answer error:', error);
          });
      }
      break;
    case 'new-ice-candidate':
      console.log('ice candidate received from', sender);
      remoteConnection = peersStore.connections[sender];
      if (remoteConnection) {
        remoteConnection.addIceCandidate(new RTCIceCandidate(candidate))
          .catch((error) => {
            console.log('ice candidate add error:', error);
          });
      }
      break;
  }
};

export default {
  init,
  cleanup,
  setLocalStream,
  setLocalId,
  handleClientJoined,
  handleClientLeft,
  handleWebRTCMessage,
};
