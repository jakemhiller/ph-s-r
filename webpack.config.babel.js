require('babel-core/register');

const config = {
  title: 'My PhaserJS Game',
  entryFileName: 'index.js',
  outputFileName: 'bundle.js',
  entryFolderName: 'client',
  outputFolderName: 'static',
  extensions: ['', '.js', '.json', '.css']
};

module.exports = require('./scripts/webpack.config.phaser')(config);
