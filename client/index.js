// Basic page styles
import './styles';

// Import global phaser modules
import 'pixi';
import 'p2';
import Phaser from 'phaser';

// Import game states
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

game.state.start('Intro');
