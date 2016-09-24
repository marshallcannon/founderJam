function Player(x, y, playerNumber) {

  var image;
  if(playerNumber === 1)
    image = 'player1';
  else {
    image = 'player2';
  }

  Phaser.Sprite.call(this, game, x, y, image);

  this.anchor.setTo(0.5, 0.5);

}
Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.pickUp = function(instrument) {

  console.log(instrument);

};
