var loadingState = {

  preload: function() {

  },

  create: function() {

    game.state.add('load', loadingState);
    game.state.add('game', gameState);

    game.state.start('game');

  },

  update: function() {

  }

};
