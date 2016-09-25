var menuState = {

  preload: function() {},

  create: function() {

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

    //Start Controllers
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;
    pad2 = game.input.gamepad.pad2;

    this.starting = false;

    game.camera.onFlashComplete.add(this.fade, this);
    game.camera.onFadeComplete.add(this.startGame, this);


  },

  update: function() {

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
      }

    }

  },

  fade: function() {
    game.camera.fade('0x000000', 1000);
  },

  startGame: function() {
    game.state.start('game');
  }

};
