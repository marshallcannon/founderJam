var gameState = {

  preload: function() {

  },

  create: function() {

    //Advanced timing for fps display
    game.time.advancedTiming = true;

    //Start physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 500;

    //Create Song Objects
    this.songDanube = game.add.audio('blueDanube');
    this.songDanube.speed = 2.66;

    //Create Groups
    this.backgroundGroup = game.add.group();
    this.playerGroup = game.add.group();
    this.instrumentGroup = game.add.group();
    this.boundingBoxGroup = game.add.group();
    this.noteFrameGroup = game.add.group();
    this.track1 = game.add.group();
    this.track2 = game.add.group();
    this.track3 = game.add.group();
    this.noteIconGroup = game.add.group();
    this.foregroundGroup = game.add.group();

    //Detail Tracks
    this.track1.x = 135; this.track1.width = 70;
    this.track2.x = 265; this.track2.width = 70;
    this.track3.x = 395; this.track3.width = 70;

    //Background
    this.backgroundGroup.add(game.make.sprite(0, 0, 'theatre'));
    //Foreground
    this.foregroundGroup.add(game.make.sprite(0, 0, 'theatreFG'));

    //Players
    this.p1 = this.playerGroup.add(new Player(250, 430, 1));
    this.p2 = this.playerGroup.add(new Player(350, 440, 2));

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

    //Note Frames
    this.noteFrameGroup.add(game.make.sprite(170, 325, 'tileFrame')).anchor.setTo(0.5, 0.5);
    this.noteFrameGroup.add(game.make.sprite(300, 325, 'tileFrame')).anchor.setTo(0.5, 0.5);
    this.noteFrameGroup.add(game.make.sprite(430, 325, 'tileFrame')).anchor.setTo(0.5, 0.5);

    //Start Music
    this.startSong(this.songDanube, beatMaps.danube);

  },

  update: function() {

    //Take Input from Controllers
    this.controllerInput(pad1, this.p1);
    this.controllerInput(pad2, this.p2);

    //Collision
    game.physics.arcade.collide(this.instrumentGroup, this.boundingBoxGroup);
    game.physics.arcade.collide(this.instrumentGroup);

  },

  render: function() {

    // for(var i = 0; i < this.boundingBoxGroup.length; i++)
    // {
    //   var body = this.boundingBoxGroup.getAt(i).body;
    //   game.debug.geom(new Phaser.Rectangle(body.x, body.y, body.width, body.height), 'rgba(255,255,0,1)');
    // }

    game.debug.text(game.time.fps, 25, 25);

    game.debug.text('Controller 1: ' + pad1.connected, 25, 50);
    game.debug.text('Controller 2: ' + pad2.connected, 25, 75);

    game.debug.text(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X), 25, 100);
    game.debug.text(pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X), 25, 125);

  },

  startSong: function(song, beatMap) {

    //Create Notes
    for(var i = 0; i < beatMap.length; i++)
    {
      this.noteGroup.add(new Note(song.speed, beatMap[i][0], beatMap[i][1], beatMap[i][2], beatMap[i][3]));
    }

    //Play Song
    song.play();

  },

  controllerInput: function(controller, player) {

    //Move Left
    if (controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
      if(player.x - player.width/2 > 66)
        player.x += controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)*4;
      else
        player.x = 66 + player.width/2;
    }
    //Move Right
    else if (controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
      if(player.x + player.width/2 < 534)
        player.x += controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)*4;
      else
        player.x = 534 - player.width/2;
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
        velocity.y = this.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) * 300;
        this.player.throw(velocity);
      }
    }

  },

  boundingBoxes: function() {

    var box;

    box = this.boundingBoxGroup.add(game.make.sprite(0, 0, null));
    game.physics.arcade.enable(box);
    box.body.setSize(66, 600);
    box.body.immovable = true;
    box.body.allowGravity = false;

    box = this.boundingBoxGroup.add(game.make.sprite(534, 0, null));
    game.physics.arcade.enable(box);
    box.body.setSize(66, 600);
    box.body.immovable = true;
    box.body.allowGravity = false;

    box = this.boundingBoxGroup.add(game.make.sprite(50, 500, null));
    game.physics.arcade.enable(box);
    box.body.setSize(500, 100);
    box.body.immovable = true;
    box.body.allowGravity = false;

  }

};
