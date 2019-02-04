const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './App.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js'
  },
  devServer: {
    overlay: true, // вывод ошибок прямо в окне браузера
  },
  devtool: 'eval-sourcemap',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ]
};