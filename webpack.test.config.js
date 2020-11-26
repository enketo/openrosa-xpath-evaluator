var path = require('path');

module.exports = {
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    library: 'orxe',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
    ]
  },
  devtool: false
};
