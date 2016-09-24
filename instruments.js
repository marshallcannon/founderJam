/*########################################################
                    PARENT INSTRUMENT
########################################################*/
function Instrument(x, y, image) {

  Phaser.Sprite.call(this, game, x, y, image);
  gameState.instrumentGroup.add(this);

  this.anchor.setTo(0.5, 0.5);

  game.physics.arcade.enable(this);
  this.body.enable = true;
  this.body.velocity.setTo(200, 0);
  this.body.bounce.y = 0.2;
  this.body.bounce.x = 0.5;
  this.body.collideWorldBounds = true;

}
Instrument.prototype = Object.create(Phaser.Sprite.prototype);

/*########################################################
                    INSTRUMENT A
########################################################*/
function InstA() {

  Instrument.call(this, 100, 100, 'instrument');

}
InstA.prototype = Object.create(Instrument.prototype);
