function Note(songSpeed, track, instrument, button, time) {

  var x;
  var y;
  var tile;

  if(track === 1) {x = 168;}
  else if(track === 2) {x = 300;}
  else if(track === 3) {x = 432;}

  if(instrument === 1) {tile = 'tile1';}
  else if(instrument === 2) {tile = 'tile2';}
  else if(instrument === 3) {tile = 'tile3';}
  else if(instrument === 4) {tile = 'tile4';}
  this.instrument = instrument;

  this.speed = songSpeed * 25;

  y = 391 - (time * this.speed) / 1000;

  //Run Sprite Constructor
  Phaser.Sprite.call(this, game, x, y, tile);
  this.anchor.setTo(0.5, 0.5);

  game.physics.arcade.enable(this);
  this.body.allowGravity = false;
  this.body.velocity.y = this.speed;

  //Create Button Sprite
  this.button = gameState.noteIconGroup.add(game.make.sprite(this.x-13, this.y, button));
  this.button.anchor.setTo(0.5, 0.5);

  //Save button value as number
  if(button === 'a') {this.buttonNumber = 0;}
  else if(button === 'b') {this.buttonNumber = 1;}
  else if(button === 'x') {this.buttonNumber = 2;}
  else if(button === 'y') {this.buttonNumber = 3;}

}
Note.prototype = Object.create(Phaser.Sprite.prototype);

Note.prototype.update = function() {

  if(this.button)
  {
      this.button.y = this.y+2;
  }

  if(this.y > 391 + 15)
  {
    this.fail();
  }

};

Note.prototype.succeed = function(accuracy) {

  this.button.destroy();
  this.destroy();

  if(accuracy <= 6)
  {
    gameState.bloom(this.x, 'gold');
    gameState.score += 10;
  }
  else
  {
    gameState.bloom(this.x, 'white');
    gameState.score += 5;
  }

};

Note.prototype.fail = function() {

  this.button.destroy();
  this.destroy();

  gameState.badBorder.alpha = 1;
  game.add.tween(gameState.badBorder).to( { alpha: 0 }, 500, "Linear", true);
  game.camera.shake(0.01, 100);

};
