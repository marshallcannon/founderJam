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
  this.body.onCollide = new Phaser.Signal();
  this.body.onCollide.add(this.friction, this);

}
Instrument.prototype = Object.create(Phaser.Sprite.prototype);

Instrument.prototype.update = function() {

};

Instrument.prototype.friction = function() {

  if(this.body.velocity.y < 2 && this.body.velocity.y > -2)
    this.body.velocity.x *= 0.9;

};

/*########################################################
                    INSTRUMENT A
########################################################*/
function InstA() {

  Instrument.call(this, 100, 400, 'instrument');

}
InstA.prototype = Object.create(Instrument.prototype);
