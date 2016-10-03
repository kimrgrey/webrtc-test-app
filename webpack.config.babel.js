import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';
import postcssFocus from 'postcss-focus';

export default {
  entry: {
    app: path.join(process.cwd(), 'app/index.jsx'),
  },
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
        exclude: [/node_modules/, /app\/css/],
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: [/node_modules/, /app\/css/],
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  postcss: () => ([
    cssnext,
    postcssFocus,
  ]),
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(process.cwd(), 'app/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
    root: path.resolve(process.cwd(), 'app'),
  },
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  stats: false,
  progress: true,
  externals: {
    'config': JSON.stringify(require('./app.config.json')),
  }
};
