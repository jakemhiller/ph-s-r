const path = require('path');
const webpack = require('webpack');
const { dir, isDEV } = require('./webpack-helpers');

module.exports = (options = {}) => {
  const {
    entryFileName = 'index.js',
    outputFileName = 'bundle.js',
    entryFolderName = 'client',
    outputFolderName = 'assets',
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
      path: dir(`${staticFolderName}/${outputFolderName}`),
      publicPath: outputFolderName,
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
