'use strict';

const path = require('path');
const webpack = require('webpack');
const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
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

const imgLoader = process.env.NODE_ENV == 'development' ? 'url-loader' : 'file-loader';

const publicPath = process.env.NODE_ENV == 'development' ? '/' : './';

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
    publicPath: publicPath
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
          test: /\.(png|jpg|gif)$/i,
            loader: imgLoader,
            options: {
              name: './icons/[name].[ext]'
            }
        },
        {test:  /\.svg$/,
          include: path.join(srcPath, 'icons'),
          loaders: [
            { loader: 'external-svg-sprite-loader',
              options: {
                iconName: '[name]-[hash:base64:10]',
                name: './icons/sprite.svg'
              }
            },
            { loader: 'svgo-loader?' + JSON.stringify({
                plugins: [
                  { removeTitle: true },
                  { convertPathData: false },
                  { removeUselessStrokeAndFill: true }
                  ]
                })
            }
            ],
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
    new SvgStorePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    }),
    new FaviconsWebpackPlugin({
      logo: './favicon.png',
      prefix: 'icons-[hash]/',
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
  ]
};
