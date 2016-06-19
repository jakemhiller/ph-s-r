
import Phaser from 'phaser';

export class Intro extends Phaser.State {

  state = 'intro';
  gameObjects = {
    bullets: null,
    ship: null,
    cursors: null
  };

  preload() {
    const dudeData = [
      '.......3.....',
      '......333....',
      '....5343335..',
      '...332333333.',
      '..33333333333',
      '..37773337773',
      '..38587778583',
      '..38588888583',
      '..37888888873',
      '...333333333.',
      '.F....5556...',
      '3E34.6757.6..',
      '.E.55.666.5..',
      '......777.5..',
      '.....6..7....',
      '.....7..7....'
    ];

    this.game.create.texture('dude', dudeData, 4, 4, 0);
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.gameObjects.cursors = this.game.input.keyboard.createCursorKeys();
    this.gameObjects.bullets = this.game.add.group();
    this.gameObjects.ship = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

    const { bullets, ship } = this.gameObjects;

    for (let i = 0; i < 10; i++) {
      const bullet = bullets.create(
        this.game.rnd.integerInRange(200, 1700),
        this.game.rnd.integerInRange(-200, 400),
        'dude'
      );
      this.game.physics.p2.enable(bullet, false);
    }

    this.game.physics.p2.enable(ship);
  }

  update() {
    const { bullets, ship, cursors } = this.gameObjects;

    bullets.forEachAlive(this.moveBullets, this);  // make bullets accelerate to ship

    if (cursors.left.isDown) {
      ship.body.rotateLeft(100);
    } else if (cursors.right.isDown) {
      ship.body.rotateRight(100);
    } else {
      ship.body.setZeroRotation();
    }

    if (cursors.up.isDown) {
      ship.body.thrust(400);
    } else if (cursors.down.isDown) {
      ship.body.reverse(400);
    }
  }

  moveBullets(bullet) {
    const { ship } = this.gameObjects;
    this.accelerateToObject(bullet, ship, 30);
  }

  accelerateToObject(obj1, obj2, speed = 60) {
    const obj = obj1;
    const angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj.body.rotation = angle + this.game.math.degToRad(90);
    obj.body.force.x = Math.cos(angle) * speed;
    obj.body.force.y = Math.sin(angle) * speed;
  }
}
