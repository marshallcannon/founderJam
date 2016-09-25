var loadingState = {

  preload: function() {

    //Load Music
    game.load.audio('blueDanube', 'assets/music/blue_danube.ogg');
    game.load.audio('kingtut', 'assets/music/kingtut.ogg');

    //Load Players
    game.load.spritesheet('player1', 'assets/images/p1_base.png', 64, 64);
    game.load.image('player2', 'assets/images/charMed.png');

    //Load Instruments
    game.load.image('tuba', 'assets/images/tuba.png');
    game.load.image('guitar', 'assets/images/guitar.png');
    game.load.image('flute', 'assets/images/flute.png');
    game.load.image('keytar', 'assets/images/keytar.png');

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

    //Load Font
    game.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.fnt');

    //Load Effects
    game.load.image('badBorder', 'assets/images/badBorder.png');

  },

  create: function() {

    game.state.add('load', loadingState);
    game.state.add('game', gameState);

  },

  update: function() {

    if(game.cache.isSoundReady('blueDanube') && game.cache.isSoundReady('kingtut'))
      game.state.start('game');

  }

};
