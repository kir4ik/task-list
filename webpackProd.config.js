const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
/*minify & optimization css*/
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './App.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'js/[name].[contenthash].js'
  },
  devtool: false,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        minify(file, sourceMap) {
          const extractedComments = [];

          // Custom logic for extract comments

          return require('uglify-js') // Or require('./path/to/uglify-module')
            .minify(file, {
              compress: {
                drop_console: true,
                toplevel: true
              },
              mangle: {
                toplevel: true
              },
              output: {
                quote_style: 3,
                comments: false
              }
            });
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('docs', {}),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[contenthash].css',
    }),
  ]
};