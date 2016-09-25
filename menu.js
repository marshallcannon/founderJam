var menuState = {

  preload: function() {},

  create: function() {

    game.currentSong = null;

    var background = game.add.sprite(0, 0, 'menuBG');
    this.char1 = game.add.sprite(0, 0, 'menuChar1');
    this.char1.visible = false;
    this.char2 = game.add.sprite(0, 0, 'menuChar2');
    this.char2.visible = false;
    var spotlight = game.add.sprite(0, 0, 'spotlight');
    this.leftButton = game.add.sprite(91, 457, 'menuButtons');
    this.rightButton = game.add.sprite(508, 457, 'menuButtons');
    this.leftButton.anchor.setTo(0.5, 0.5);
    this.rightButton.anchor.setTo(0.5, 0.5);

    var title = game.add.sprite(game.world.centerX, 70, 'title');
    title.anchor.setTo(0.5, 0.5);
    title.scale.setTo(0.75, 0.75);

    //Create Song Objects
    game.songDanube = game.add.audio('blueDanube');
    game.songDanube.speed = 2.66;

    game.songKingTut = game.add.audio('kingtut');
    game.songKingTut.speed = 3.33;

    game.songCommuniClique = game.add.audio('communiclique');
    game.songCommuniClique.speed = 4;

    this.songList = [
      {title: 'King Tut', song: game.songKingTut, beatMap: beatMaps.kingtut},
      {title: 'Clique', song: game.songCommuniClique, beatMap: beatMaps.communiclique}
    ];

    var songSelectText = game.add.bitmapText(game.world.centerX, 300, 'font', 'Select a Song');
    songSelectText.anchor.setTo(0.5, 0.5);

    this.songIterator = 0;

    this.songText = game.add.bitmapText(game.world.centerX, 350, 'font', this.songList[this.songIterator].title);
    this.songText.anchor.setTo(0.5, 0.5);
    this.songText.scale.setTo(0.75, 0.75);

    this.leftArrow = game.add.sprite(125, 353, 'arrowLeft');
    this.leftArrow.anchor.setTo(0.5, 0.5);
    this.rightArrow = game.add.sprite(475, 353, 'arrowRight');
    this.rightArrow.anchor.setTo(0.5, 0.5);

    //Start Controllers
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;
    pad2 = game.input.gamepad.pad2;

    this.starting = false;
    this.analogPressed = false;

    game.camera.onFlashComplete.add(this.fade, this);
    game.camera.onFadeComplete.add(this.startGame, this);

    this.crash = game.add.audio('crash');

  },

  update: function() {

    //Buttons
    if(!this.starting)
    {
      if(pad1.isDown(0))
      {
        this.leftButton.frame = 1;
        this.char1.visible = true;
      }
      else {
        this.leftButton.frame = 0;
        this.char1.visible = false;
      }
      if(pad2.isDown(0))
      {
        this.rightButton.frame = 1;
        this.char2.visible = true;
      }
      else {
        this.rightButton.frame = 0;
        this.char2.visible = false;
      }

      if(pad1.isDown(0) && pad2.isDown(0))
      {
        this.starting = true;
        game.camera.flash('0xFFFFFF');
        this.leftButton.frame = 1;
        this.rightButton.frame = 1;
        this.char1.visible = true;
        this.char2.visible = true;
        game.currentSong = this.songList[this.songIterator];
        this.crash.play();
      }

      //Analog
      if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.5 && !this.analogPressed)
      {
        if(this.songIterator > 0)
        {
          this.songIterator--;
          this.analogPressed = true;
        }
      }
      if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.5 && !this.analogPressed)
      {
        if(this.songIterator < this.songList.length-1)
        {
          this.songIterator++;
          this.analogPressed = true;
        }
      }
      if(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > -0.1 && pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < 0.1)
      {
        this.analogPressed = false;
      }

      //Show/Hide Arrows
      if(this.songIterator === 0)
        this.leftArrow.visible = false;
      else
        this.leftArrow.visible = true;
      if(this.songIterator === this.songList.length-1)
        this.rightArrow.visible = false;
      else
        this.rightArrow.visible = true;

      //Update song text
      this.songText.text = this.songList[this.songIterator].title;

    }

  },

  fade: function() {
    game.camera.fade('0x000000', 1000);
  },

  startGame: function() {
    game.state.start('game');
  }

};
