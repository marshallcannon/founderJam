var loadingState = {

  preload: function() {

    //Load Music
    game.load.audio('blueDanube', 'assets/music/blue_danube.ogg');

    //Load Players
    game.load.image('player1', 'assets/images/charLarge.png');
    game.load.image('player2', 'assets/images/charMed.png');

    //Load Instruments
    game.load.image('instrument', 'assets/images/instrument.png');
    game.load.image('instrument2', 'assets/images/instrument2.png');

    //Load Background
    game.load.image('theatre', 'assets/images/theatreBG.png');
    game.load.image('theatreFG', 'assets/images/theatreFG.png');

    //Load Tiles and Buttons
    game.load.image('tile1', 'assets/images/tile1.png');
    game.load.image('tile2', 'assets/images/tile2.png');
    game.load.image('tile3', 'assets/images/tile3.png');
    game.load.image('tile4', 'assets/images/tile4.png');
    game.load.image('tileFrame', 'assets/images/tileFrame.png');
    game.load.image('a', 'assets/images/aButton.png');
    game.load.image('b', 'assets/images/bButton.png');
    game.load.image('x', 'assets/images/xButton.png');
    game.load.image('y', 'assets/images/yButton.png');

  },

  create: function() {

    game.state.add('load', loadingState);
    game.state.add('game', gameState);

  },

  update: function() {

    if(game.cache.isSoundReady('blueDanube'))
      game.state.start('game');

  }

};
