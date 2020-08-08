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
      {
        test: /\.js$/,
        exclude: /node_modules|node/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  'modules': 'umd'
                }
              ]
            ]
          }
        }
      }
    ]
  },
  devtool: false
};
