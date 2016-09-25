var loadingState = {

  preload: function() {

    //Load Font
    game.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.fnt');

    //Load Loading Screen
    game.load.image('loading', 'assets/images/loading.png');

    //Load Music
    game.load.audio('blueDanube', 'assets/music/blue_danube.ogg');
    game.load.audio('kingtut', 'assets/music/kingtut.ogg');

    //Load Players
    game.load.spritesheet('player1', 'assets/images/p1_base.png', 64, 64);
    game.load.spritesheet('player1_arms', 'assets/images/p1_arms.png', 64, 64);
    game.load.spritesheet('player2', 'assets/images/p2_base.png', 64, 64);
    game.load.spritesheet('player2_arms', 'assets/images/p2_arms.png', 64, 64);

    //Load Instruments
    game.load.image('tuba', 'assets/images/tuba.png');
    game.load.image('guitar', 'assets/images/guitar.png');
    game.load.image('flute', 'assets/images/flute.png');
    game.load.image('keytar', 'assets/images/keytar.png');

    //Load Background
    game.load.image('theatre', 'assets/images/theatreBG.png');
    game.load.image('theatreFG', 'assets/images/theatreFG.png');

    //Load Tiles and Buttons
    game.load.image('tile1', 'assets/images/CARD-TUBA.png');
    game.load.image('tile2', 'assets/images/CARD-GUITAR.png');
    game.load.image('tile3', 'assets/images/CARD-FLUTE.png');
    game.load.image('tile4', 'assets/images/CARD-KEYTAR.png');
    game.load.image('tileFrame', 'assets/images/tileFrame.png');
    game.load.image('a', 'assets/images/BUTTON-A.png');
    game.load.image('b', 'assets/images/BUTTON-B.png');
    game.load.image('x', 'assets/images/BUTTON-X.png');
    game.load.image('y', 'assets/images/BUTTON-Y.png');

    //Load Effects
    game.load.image('badBorder', 'assets/images/badBorder.png');

    //Load Menu Screen
    game.load.image('menuBG', 'assets/images/Menu.png');
    game.load.image('spotlight', 'assets/images/spotlight.png');
    game.load.spritesheet('menuButtons', 'assets/images/A-BUTTON-MENU.png', 80, 80);
    game.load.image('menuChar1', 'assets/images/MENU-CHAR-1.png');
    game.load.image('menuChar2', 'assets/images/MENU-CHAR-2.png');

  },

  create: function() {

    var loadingScreen = game.add.sprite(0, 0, 'loading');

    game.scale.setUserScale(window.innerHeight/600, window.innerHeight/600);
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

    game.state.add('load', loadingState);
    game.state.add('menu', menuState);
    game.state.add('game', gameState);

  },

  update: function() {

    if(game.cache.isSoundReady('blueDanube') && game.cache.isSoundReady('kingtut'))
      game.state.start('menu');

  }

};
