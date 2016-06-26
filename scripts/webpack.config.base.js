const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dir, isDEV } = require('./webpack-helpers');

module.exports = (options = {}) => {
  const {
    title = 'My PhaserJS Game',
    entryFileName = 'index.js',
    outputFileName = 'bundle.js',
    entryFolderName = 'client',
    staticFolderName = 'static',
    extensions = ['', '.js', '.json', '.css'],
    devtool = isDEV ? '#inline-source-map' : 'hidden-source-map'
  } = options;

  return {
    devtool,
    context: dir(entryFolderName),
    entry: {
      js: [`./${entryFileName}`]
    },
    output: {
      path: dir(staticFolderName),
      filename: outputFileName
    },
    resolve: {
      modules: [
        path.resolve(entryFolderName),
        'node_modules'
      ],
      extensions,
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            { loader: 'babel-loader', query: { cacheDirectory: true } }
          ]
        },
        {
          test: /\.json$/,
          loaders: [
            'json-loader'
          ]
        },
        {
          test: /\.css$/,
          loaders: [
            'style',
            { loader: 'css', query: { modules: true } }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title,
        template: 'index.html',
        inject: 'body'
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: !isDEV,
        debug: false
      })
    ],
    devServer: {
      contentBase: staticFolderName
    }
  };
};
