/*########################################################
                    PARENT INSTRUMENT
########################################################*/
function Instrument(x, y, image, id) {

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
                    INSTRUMENT A
########################################################*/
function Tuba() {

  Instrument.call(this, 100, 400, 'instrument', 1);

}
Tuba.prototype = Object.create(Instrument.prototype);

function Guitar() {

  Instrument.call(this, 200, 400, 'instrument2', 2);

}
Guitar.prototype = Object.create(Instrument.prototype);

function Flute() {

  Instrument.call(this, 300, 400, 'instrument2', 3);

}
Flute.prototype = Object.create(Instrument.prototype);

function Keytar() {

  Instrument.call(this, 400, 400, 'instrument2', 4);

}
Keytar.prototype = Object.create(Instrument.prototype);
