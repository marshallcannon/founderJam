function Player(x, y, image_base, image_arms) {

  Phaser.Sprite.call(this, game, x, y, image_base);

  this.anchor.setTo(0.5, 0.5);

  //Arms Spritesheet
  this.arms = game.make.sprite(this.x, this.y, image_arms);
  this.arms.anchor.setTo(0.5, 0.5);
  this.arms.animations.add('idle', [6,7], 4, true);
  this.arms.animations.add('run', [8,9], 8, true);
  this.arms.animations.add('tuba', [10,11], 4, true);
  this.arms.animations.add('guitar', [4,5], 4, true);
  this.arms.animations.add('flute', [2,3], 4, true);
  this.arms.animations.add('keytar', [0,1], 4, true);

  this.instrument = null;

}
Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.update = function() {

  this.arms.x = this.x;

  if(this.instrument)
  {
    this.instrument.x = this.x;

    if(this.instrument.id === 1)
      this.arms.play('tuba');
    else if(this.instrument.id === 2)
      this.arms.play('guitar');
    else if(this.instrument.id === 3)
      this.arms.play('flute');
    else if(this.instrument.id === 4)
      this.arms.play('keytar');
  }

};

Player.prototype.pickUp = function(instrument) {

  this.instrument = instrument;
  instrument.body.enable = false;
  instrument.x = this.x;
  instrument.y = this.y;
  this.instrument.visible = false;

};

Player.prototype.throw = function(velocity) {

  if(this.instrument)
  {
    this.instrument.body.enable = true;
    this.instrument.body.velocity = velocity;
    this.instrument.visible = true;
    this.instrument = null;
    this.arms.animations.play('run');
  }
  else {
    console.error("Trying to throw an instrument, but the player isn't holding an instrument");
  }

};

function Player1(x, y) {

  Player.call(this, x, y, 'player1', 'player1_arms');

  this.animations.add('idle', [0,1], 4, true);
  this.animations.add('run', [2,3,4,5,6,7,8,9], 8, true);

  this.animations.play('idle');

}
Player1.prototype = Object.create(Player.prototype);

function Player2(x, y) {

  Player.call(this, x, y, 'player2', 'player2_arms');

  this.animations.add('idle', [0,1], 4, true);
  this.animations.add('run', [2,3,4,5,6,7,8,9], 8, true);

  this.animations.play('idle');

}
Player2.prototype = Object.create(Player.prototype);
