const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ChromeExtensionDevPlugin = require('./plugin/index.js')
const manifestConfig = require('./manifestConfig.json')
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, '../src/content-script/index'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "content-script/index.js",
    libraryTarget: "this",
    clean: true,
    publicPath: "./"
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new MiniCssExtractPlugin({
      filename: 'content-script/index.css',
      runtime: false
    }),
    new ChromeExtensionDevPlugin({
      manifestConfig
    })
  ],
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[
          {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false
          }
        },
          {
          loader: 'css-loader',
          options: {
            esModule: false,
          }
        }],
      }
    ]
  }
}
