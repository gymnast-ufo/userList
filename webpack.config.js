const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV = 'development';
const isProduction = process.env.NODE_ENV = 'production';

module.exports = {
  entry: [
    './src/index.js',
    './src/index.sass'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: [ path.join(__dirname, 'dist'), path.join(__dirname, 'src') ],
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.sass$/i,
        use: [
          isProduction
            ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hml: isDevelopment
              },
            }
            : { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.m?js$/i,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
    }),
  ],
};