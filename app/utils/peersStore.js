import config from 'config';
import websocket from 'utils/websocket';
import { updateRemoteStreams } from 'actions/conference';

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

const getRemoteStreams = () => {
  return Object.keys(peersStore.remoteStreams).map((remoteId) => {
    return { id: remoteId, stream: peersStore.remoteStreams[remoteId] };
  });
};

const createConnection = (remoteId) => {
  const pc = new RTCPeerConnection(config.peerConnectionConfig);

  peersStore.connections[remoteId] = pc;

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

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      websocket.emit('webrtc', JSON.stringify({
        type: 'new-ice-candidate',
        sender: peersStore.localId,
        receiver: remoteId,
        candidate: event.candidate,
      }));
    }
  };

  if (pc.addTrack) {
    pc.ontrack = (event) => {
      peersStore.remoteStreams[remoteId] = event.streams[0];
      peersStore.dispatch(updateRemoteStreams());
    };
  }
  else {
    pc.onaddstream = (event) => {
      peersStore.remoteStreams[remoteId] = event.stream;
      peersStore.dispatch(updateRemoteStreams());
    };
  }

  return pc;
};

const destroyConnection = (remoteId) => {
  const remoteConnection = peersStore.connections[remoteId];
  const remoteStream = peersStore.remoteStreams[remoteId];

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

const handleClientJoined = (message) => {
  const remoteId = JSON.parse(message).id;

  console.log('client joined', remoteId);

  const remoteConnection = createConnection(remoteId);

  // TODO: deal with RTCPeerConnection.negotiationneeded
  // remoteConnection.negotiationneeded = (event) => {
    remoteConnection.createOffer()
      .then((offer) => ( remoteConnection.setLocalDescription(offer) ))
      .then(() => {
        console.log('sending video offer to', remoteId);
        websocket.emit('webrtc', JSON.stringify({
          type: 'video-offer',
          sender: peersStore.localId,
          receiver: remoteId,
          sdp: remoteConnection.localDescription,
        }));
      })
      .catch((desc) => {
        console.log('handle client join error:', desc);
      });
  // };
};

const handleClientLeft = (message) => {
  const remoteId = JSON.parse(message).id;

  console.log('client left', remoteId);

  destroyConnection(remoteId);

  delete peersStore.remoteStreams[remoteId];
  delete peersStore.connections[remoteId];

  peersStore.dispatch(updateRemoteStreams());
};

const handleWebRTCMessage = (message) => {
  const { type, sender, receiver, sdp, candidate  } = JSON.parse(message);

  var remoteConnection = null;

  switch (type) {
    case 'video-offer':
      console.log('video offer received from', sender);
      remoteConnection = createConnection(sender);

      remoteConnection.setRemoteDescription(new RTCSessionDescription(sdp))
        .then(() => ( remoteConnection.createAnswer() ))
        .then((answer) => remoteConnection.setLocalDescription(answer))
        .then(() => {
          console.log('sending video answer to', sender);
          websocket.emit('webrtc', JSON.stringify({
            type: 'video-answer',
            sender: peersStore.localId,
            receiver: sender,
            sdp: remoteConnection.localDescription,
          }));
        })
        .catch((error) => {
          console.log('video offer error:', error);
        });
      break;
    case 'video-answer':
      console.log('video answer received from', sender);
      remoteConnection = peersStore.connections[sender];
      if (remoteConnection) {
        remoteConnection.setRemoteDescription(new RTCSessionDescription(sdp))
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
  getRemoteStreams,
  handleClientJoined,
  handleClientLeft,
  handleWebRTCMessage,
};
