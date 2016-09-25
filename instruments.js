/*########################################################
                    PARENT INSTRUMENT
########################################################*/
function Instrument(x, y, image, id) {

  Phaser.Sprite.call(this, game, x, y, image);
  gameState.instrumentGroup.add(this);

  this.anchor.setTo(0.5, 0.5);

  game.physics.arcade.enable(this);
  this.body.enable = true;
  this.body.bounce.y = 0.2;
  this.body.bounce.x = 0.5;
  this.body.collideWorldBounds = true;
  this.body.onCollide = new Phaser.Signal();
  this.body.onCollide.add(this.friction, this);

  this.id = id;

}
Instrument.prototype = Object.create(Phaser.Sprite.prototype);

Instrument.prototype.update = function() {

};

Instrument.prototype.friction = function() {

  if(this.body.velocity.y < 5 && this.body.velocity.y > -5)
    this.body.velocity.x *= 0.9;

};

/*########################################################
                    INSTRUMENTS
########################################################*/
function Tuba() {

  Instrument.call(this, 150, 400, 'tuba', 1);

}
Tuba.prototype = Object.create(Instrument.prototype);

function Guitar() {

  Instrument.call(this, 250, 400, 'guitar', 2);

}
Guitar.prototype = Object.create(Instrument.prototype);

function Flute() {

  Instrument.call(this, 350, 400, 'flute', 3);

  this.angle = -45;

}
Flute.prototype = Object.create(Instrument.prototype);

function Keytar() {

  Instrument.call(this, 450, 400, 'keytar', 4);

}
Keytar.prototype = Object.create(Instrument.prototype);
