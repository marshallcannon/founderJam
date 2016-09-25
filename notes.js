function Note(songSpeed, track, instrument, button, time) {

  var x;
  var y;
  var tile;

  if(track === 1) {x = 170; gameState.track1.add(this);}
  else if(track === 2) {x = 300; gameState.track2.add(this);}
  else if(track === 3) {x = 430; gameState.track3.add(this);}

  if(instrument === 1) {tile = 'tile1';}
  else if(instrument === 2) {tile = 'tile2';}
  else if(instrument === 3) {tile = 'tile3';}
  else if(instrument === 4) {tile = 'tile4';}
  this.instrument = instrument;

  this.speed = songSpeed * 25;

  y = 325 - (time * this.speed) / 1000;

  //Run Sprite Constructor
  Phaser.Sprite.call(this, game, x, y, tile);
  this.anchor.setTo(0.5, 0.5);

  game.physics.arcade.enable(this);
  this.body.allowGravity = false;
  this.body.velocity.y = this.speed;

  //Create Button Sprite
  this.button = gameState.noteIconGroup.add(game.make.sprite(this.x, this.y, button));
  this.button.anchor.setTo(0.5, 0.5);

}
Note.prototype = Object.create(Phaser.Sprite.prototype);

Note.prototype.update = function() {

  if(this.button)
  {
      this.button.y = this.y;
  }

};
