var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: 'timer.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'timer_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
