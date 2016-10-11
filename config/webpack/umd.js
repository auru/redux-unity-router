const path = require('path');
const webpack = require('webpack');
const config = require('./../config');

const ROOT = process.cwd();
const SRC = path.join(ROOT, config.SRC_PATH);

module.exports = {
  cache: false,
  context: SRC,
  entry: './index.js',
  output: {
    path: path.join(ROOT, config.BUILD_PATH_UMD),
    filename: `${config.LIB_FILENAME}.js`,
    library: config.LIB_NAME,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [SRC],
        loader: require.resolve('babel-loader')
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
};
