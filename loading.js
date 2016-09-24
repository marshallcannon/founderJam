var loadingState = {

  preload: function() {

    //Load Players
    game.load.image('player1', 'assets/images/player1.png');
    game.load.image('player2', 'assets/images/player2.png');

    //Load Instruments
    game.load.image('instrument', 'assets/images/instrument.png');

  },

  create: function() {

    game.state.add('load', loadingState);
    game.state.add('game', gameState);

    game.state.start('game');

  },

  update: function() {

  }

};
