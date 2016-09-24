var loadingState = {

  preload: function() {

    //Load Music
    game.load.audio('blueDanube', 'assets/music/blue_danube.ogg');

    //Load Players
    game.load.image('player1', 'assets/images/player1.png');
    game.load.image('player2', 'assets/images/player2.png');

    //Load Instruments
    game.load.image('instrument', 'assets/images/instrument.png');
    game.load.image('instrument2', 'assets/images/instrument2.png');

  },

  create: function() {

    game.state.add('load', loadingState);
    game.state.add('game', gameState);

    game.state.start('game');

  },

  update: function() {

  }

};
