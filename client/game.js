import Phaser from 'phaser';
import * as states from 'states';

const game = new Phaser.Game(
  800,
  600,
  Phaser.AUTO,
  document.body,
  null,
  false,
  false
);

Object.keys(states).forEach((id) => {
  game.state.add(id, states[id]);
});

game.state.start('Example');
