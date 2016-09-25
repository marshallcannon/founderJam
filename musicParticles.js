function MusicParticle(x, y) {

  Phaser.Sprite.call(this, game, x, y, 'musicParticles');

  this.frame = game.rnd.between(0, 5);

  game.add.tween(this).to( { y: y - 100 }, 1000, "Linear", true);
  game.add.tween(this).to( { alpha: 0 }, 1000, "Linear", true);
  game.time.events.add(1000, function() {
    this.destroy();
  }, this);

}
MusicParticle.prototype = Object.create(Phaser.Sprite.prototype);
