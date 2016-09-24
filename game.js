var gameState = {

  preload: function() {

  },

  create: function() {

    //Advanced timing for fps display
    game.time.advancedTiming = true;

    //Start physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

  },

  update: function() {

  },

  render: function() {

    game.debug.text(game.time.fps, 25, 25);

  }

};
