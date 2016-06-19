import Phaser from 'phaser';
import * as states from 'states';

const game = new Phaser.Game(
  window.innerWidth || 800,
  window.innerHeight || 600,
  Phaser.AUTO,
  'main',
  null,
  false,
  false
);

Object.keys(states).forEach((id) => {
  game.state.add(id, states[id]);
});

game.state.start('Intro');

export default game;
