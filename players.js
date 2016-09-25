function Player(x, y, image_base, image_arms) {

  Phaser.Sprite.call(this, game, x, y, image_base);

  this.anchor.setTo(0.5, 0.5);

  this.instrument = null;

}
Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.update = function() {

  if(this.instrument)
  {
    this.instrument.x = this.x;
  }

};

Player.prototype.pickUp = function(instrument) {

  this.instrument = instrument;
  instrument.body.enable = false;
  instrument.x = this.x;
  instrument.y = this.y;

};

Player.prototype.throw = function(velocity) {

  if(this.instrument)
  {
    this.instrument.body.enable = true;
    this.instrument.body.velocity = velocity;
    this.instrument = null;
  }
  else {
    console.error("Trying to throw an instrument, but the player isn't holding an instrument");
  }

};

function Player1(x, y) {

  Player.call(this, x, y, 'player1', null);

  this.animations.add('idle', [0,1], 4, true);
  this.animations.add('run', [2,3,4,5,6,7,8,9], 8, true);

  this.animations.play('idle');

}
Player1.prototype = Object.create(Player.prototype);
