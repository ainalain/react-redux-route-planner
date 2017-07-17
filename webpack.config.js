'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const srcPath = path.join(__dirname, 'src');
const autoprefixer = require('autoprefixer');
const iconsPath = path.join(srcPath, 'icons');

const cssLoaders = [
  {
    loader: "css-loader",
    options: {
      modules: true,
      localIdentName: '[local]__[hash:base64:10]',
      sourceMap: true

    }
  },
  {
    loader: "sass-loader",
    options: {
      sourceMap: true,
      sourceMapContents: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        return [autoprefixer]
      }
    }
  }
];

let entry = process.env.NODE_ENV == 'development' ?
  [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/app.js')
  ] : path.resolve(__dirname, 'src/app.js');

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: 'source-map', //remove it later in production
  entry: entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, './src')
  },
  module: {
      rules: [
          {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
        },
        {
          test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: { presets: ['es2015', 'react'] }
        },
        {
          test: /\.(png|jpg|svg)$/i,
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 25000
            }
        },
        {
          test: /\.scss$/,
          use:  ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssLoaders
          })
        },
      ]
   },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
  ]
};
