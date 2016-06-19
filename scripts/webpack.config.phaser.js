const { dir, mergeConfig } = require('./webpack-helpers');

const path = require('path');

// Phaser webpack config
const phaserModule = dir('/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const webpackDefaults = require('./webpack.config.base')

module.exports = (options = {}) => {
  return mergeConfig(webpackDefaults(options), {
    module: {
      loaders: [
        { test: /pixi\.js/, loader: 'expose?PIXI' },
        { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
        { test: /p2\.js/, loader: 'expose?p2' }
      ]
    },
    resolve: {
      alias: {
        phaser,
        pixi,
        p2
      }
    }
  });
};
