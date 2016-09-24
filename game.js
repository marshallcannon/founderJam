var gameState = {

  preload: function() {

  },

  create: function() {

    //Advanced timing for fps display
    game.time.advancedTiming = true;

    //Start physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 300;

    //Start Controllers
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;
    pad2 = game.input.gamepad.pad2;

    //Create Groups
    this.backgroundGroup = game.add.group();
    this.playerGroup = game.add.group();
    this.instrumentGroup = game.add.group();

    //Players
    this.p1 = this.playerGroup.add(new Player(250, 535, 1));
    this.p2 = this.playerGroup.add(new Player(350, 545, 2));

    //Instruments
    this.instA = new InstA();

  },

  update: function() {

    this.controllerInput(pad1, this.p1);
    this.controllerInput(pad2, this.p2);

  },

  render: function() {

    game.debug.text(game.time.fps, 25, 25);

    game.debug.text('Controller 1: ' + pad1.connected, 25, 50);
    game.debug.text('Controller 2: ' + pad2.connected, 25, 75);

    game.debug.text(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X), 25, 100);
    game.debug.text(pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X), 25, 125);

  },

  startLevel: function() {

  },

  controllerInput: function(controller, player) {

    //Move Left
    if (controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
        player.x += controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)*4;
    }
    //Move Right
    else if (controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
        player.x += controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)*4;
    }

    //Right Trigger
    if(controller.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER))
    {
      //Pick Up
      if(!player.holdingInstrument)
      {
        var closestInstrument = this.instrumentGroup.getAt(0);
        for(var i = 1; i < this.instrumentGroup.length; i++)
        {
          var checkSprite = this.instrumentGroup.getAt(i);
          if(game.physics.arcade.distanceBetween(player, checkSprite) < game.physics.arcade.distaceBetween(player, closestInstrument))
          {
            closestInstrument = checkSprite;
          }
        }
        if(game.physics.arcade.distanceBetween(player, closestInstrument) < 100)
          player.pickUp(closestInstrument);
      }
      //Throw
      else
      {

      }
    }

  }

};
