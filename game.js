var gameState = {

  preload: function() {

  },

  create: function() {

    //Advanced timing for fps display
    game.time.advancedTiming = true;

    //Start physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 500;

    //Create Groups
    this.backgroundGroup = game.add.group();
    this.playerGroup = game.add.group();
    this.instrumentGroup = game.add.group();
    this.boundingBoxGroup = game.add.group();

    //Players
    this.p1 = this.playerGroup.add(new Player(250, 510, 1));
    this.p2 = this.playerGroup.add(new Player(350, 520, 2));

    //Start Controllers
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;
    pad1.onDownCallback = this.handleButtonPress;
    pad1.player = this.p1;
    pad2 = game.input.gamepad.pad2;
    pad2.onDownCallback = this.handleButtonPress;
    pad2.player = this.p2;

    //Instruments
    this.instA = new InstA();
    this.instB = new InstB();

    //Physics Bounding Boxes
    this.boundingBoxes();

  },

  update: function() {

    //Take Input from Controllers
    this.controllerInput(pad1, this.p1);
    this.controllerInput(pad2, this.p2);

    //Collision
    game.physics.arcade.collide(this.instrumentGroup, this.boundingBoxGroup);

  },

  render: function() {

    for(var i = 0; i < this.boundingBoxGroup.length; i++)
    {
      var body = this.boundingBoxGroup.getAt(i).body;
      game.debug.geom(new Phaser.Rectangle(body.x, body.y, body.width, body.height), 'rgba(255,255,0,1)');
    }

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

  },

  handleButtonPress: function(button, value) {

    //Right Trigger
    if(button === Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)
    {
      //Pick Up
      if(!this.player.instrument)
      {
        var closestInstrument = null;
        for(var i = 0; i < gameState.instrumentGroup.length; i++)
        {
          var checkSprite = gameState.instrumentGroup.getAt(i);
          //If the instrument isn't being held
          if(checkSprite.body.enable)
          {
            if(!closestInstrument)
              closestInstrument = checkSprite;
            else
            {
              if(game.physics.arcade.distanceBetween(this.player, checkSprite) < game.physics.arcade.distanceBetween(this.player, closestInstrument))
              {
                closestInstrument = checkSprite;
              }
            }
          }
        }
        if(closestInstrument)
        {
          if(game.physics.arcade.distanceBetween(this.player, closestInstrument) < 100)
            this.player.pickUp(closestInstrument);
        }
      }
      //Throw
      else
      {
        var velocity = new Phaser.Point();
        velocity.x = this.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) * 500;
        velocity.y = this.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) * 500;
        this.player.throw(velocity);
      }
    }

  },

  boundingBoxes: function() {

    var box;

    box = this.boundingBoxGroup.add(game.make.sprite(0, 0, null));
    game.physics.arcade.enable(box);
    box.body.setSize(50, 600);
    box.body.immovable = true;
    box.body.allowGravity = false;

    box = this.boundingBoxGroup.add(game.make.sprite(550, 0, null));
    game.physics.arcade.enable(box);
    box.body.setSize(50, 600);
    box.body.immovable = true;
    box.body.allowGravity = false;

    box = this.boundingBoxGroup.add(game.make.sprite(50, 575, null));
    game.physics.arcade.enable(box);
    box.body.setSize(500, 25);
    box.body.immovable = true;
    box.body.allowGravity = false;

  }

};
