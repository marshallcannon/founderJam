function Player(x, y, playerNumber) {

  var image;
  if(playerNumber === 1)
    image = 'player1';
  else {
    image = 'player2';
  }

  Phaser.Sprite.call(this, game, x, y, image);

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
