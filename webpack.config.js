const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: path.resolve('src/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'faqomatic.js',
    library: 'FaqOMatic',
    libraryTarget: 'assign',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: process.env.NODE_ENV === 'production'
   ? [new UglifyJsPlugin()]
   : []
}
