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
    this.noteFrameGroup = game.add.group();
    this.track1 = game.add.group();
    this.track2 = game.add.group();
    this.track3 = game.add.group();
    this.noteIconGroup = game.add.group();
    this.foregroundGroup = game.add.group();
    this.effectsGroup = game.add.group();
    this.uiGroup = game.add.group();

    //Detail Tracks
    this.track1.xCheck = 135; this.track1.widthCheck = 70;
    this.track2.xCheck = 265; this.track2.widthCheck = 70;
    this.track3.xCheck = 395; this.track3.widthCheck = 70;

    //Background
    this.backgroundGroup.add(game.make.sprite(0, 0, 'theatre'));
    //Foreground
    this.foregroundGroup.add(game.make.sprite(0, 0, 'theatreFG'));

    //Players
    this.p1 = this.playerGroup.add(new Player1(250, 465));
    this.playerGroup.add(this.p1.arms);
    this.p2 = this.playerGroup.add(new Player2(350, 475));
    this.playerGroup.add(this.p2.arms);

    //Link Controllers to Players
    pad1.player = this.p1;
    pad2.player = this.p2;

    //Update Button Handlers
    pad1.onDownCallback = this.handleButtonPress;
    pad2.onDownCallback = this.handleButtonPress;

    //Instruments
    this.tuba = new Tuba();
    this.guitar = new Guitar();
    this.flute = new Flute();
    this.keytar = new Keytar();

    //Physics Bounding Boxes
    this.boundingBoxes();

    //Note Frames
    // this.noteFrameGroup.add(game.make.sprite(168, 391, 'tileFrame')).anchor.setTo(0.5, 0.5);
    // this.noteFrameGroup.add(game.make.sprite(300, 391, 'tileFrame')).anchor.setTo(0.5, 0.5);
    // this.noteFrameGroup.add(game.make.sprite(432, 391, 'tileFrame')).anchor.setTo(0.5, 0.5);

    //Score
    this.score = 0;
    this.scoreText = game.add.bitmapText(440, 575, 'font', this.score.toString());
    this.scoreText.anchor.setTo(1, 1);
    this.scoreText.scale.setTo(1.25, 1.25);
    this.pointsText = game.add.bitmapText(450, 575, 'font', 'points');
    this.pointsText.anchor.setTo(0, 1);
    this.pointsText.scale.setTo(0.75, 0.75);

    //Effects
    this.badBorder = this.effectsGroup.add(game.make.sprite(0, 0, 'badBorder'));
    this.badBorder.alpha = 0;

    game.camera.flash('0x000000', 1000);
    game.camera.onFlashComplete.removeAll();
    game.camera.onFlashComplete.add(function() {this.startSong(game.currentSong.song, game.currentSong.beatMap);}, this);

    //Drummer
    var drummer = game.add.sprite(75, 550, 'drummer');
    drummer.anchor.setTo(0.5, 0.5);
    drummer.animations.add('play', [0,1], 3, true);
    drummer.animations.play('play');


  },

  update: function() {

    //Move with Joysticks on Controllers
    this.analogInput(pad1, this.p1);
    this.analogInput(pad2, this.p2);

    //Collision
    game.physics.arcade.collide(this.instrumentGroup, this.boundingBoxGroup);
    game.physics.arcade.collide(this.instrumentGroup);

    this.scoreText.text = this.score.toString();

  },

  render: function() {

    // for(var i = 0; i < this.boundingBoxGroup.length; i++)
    // {
    //   var body = this.boundingBoxGroup.getAt(i).body;
    //   game.debug.geom(new Phaser.Rectangle(body.x, body.y, body.width, body.height), 'rgba(255,255,0,1)');
    // }

    // game.debug.text(game.time.fps, 25, 25);
    //
    // game.debug.text('Controller 1: ' + pad1.connected, 25, 50);
    // game.debug.text('Controller 2: ' + pad2.connected, 25, 75);
    //
    // game.debug.text(pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X), 25, 100);
    // game.debug.text(pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X), 25, 125);
    //
    // game.debug.pixel(120, 325, 'rgba(255,255,255,1)');
    // game.debug.pixel(120, 319, 'rgba(255,0,0,1)');
    // game.debug.pixel(120, 331, 'rgba(255,0,0,1)');

  },

  startSong: function(song, beatMap) {

    //Create Notes
    for(var i = 0; i < beatMap.length; i++)
    {
      if(beatMap[i][0] === 1)
        gameState.track1.add(new Note(song.speed, beatMap[i][0], beatMap[i][1], beatMap[i][2], beatMap[i][3]));
      if(beatMap[i][0] === 2)
        gameState.track2.add(new Note(song.speed, beatMap[i][0], beatMap[i][1], beatMap[i][2], beatMap[i][3]));
      if(beatMap[i][0] === 3)
        gameState.track3.add(new Note(song.speed, beatMap[i][0], beatMap[i][1], beatMap[i][2], beatMap[i][3]));
    }

    //Play Song
    song.play();

  },

  analogInput: function(controller, player) {

    //Move Left
    if (controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
      player.scale.x = -1;
      player.arms.scale.x = -1;
      if(player.x + player.width/2 > 66)
      {
        player.x += controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)*4;
        player.animations.play('run');
        if(!player.instrument)
          player.arms.animations.play('run');
      }
      else
        player.x = 66 - player.width/2;
    }
    //Move Right
    else if (controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
      player.scale.x = 1;
      player.arms.scale.x = 1;
      if(player.x + player.width/2 < 534)
      {
        player.x += controller.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)*4;
        player.animations.play('run');
        if(!player.instrument)
          player.arms.animations.play('run');
      }
      else
        player.x = 534 - player.width/2;
    }
    else {
      player.animations.play('idle');
      if(!player.instrument)
        player.arms.animations.play('idle');
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

    //Colorful Buttons
    if(button === 0 || button === 1 || button === 2 || button === 3)
    {
      if(this.player.instrument)
      {
        //Track 1
        if(this.player.x > gameState.track1.xCheck && this.player.x < gameState.track1.xCheck + gameState.track1.widthCheck)
        {
          gameState.playNote(gameState.track1, button, this.player);
        }
        //Track 2
        else if(this.player.x > gameState.track2.xCheck && this.player.x < gameState.track2.xCheck + gameState.track2.widthCheck)
        {
          gameState.playNote(gameState.track2, button, this.player);
        }
        //Track 3
        else if(this.player.x > gameState.track3.xCheck && this.player.x < gameState.track3.xCheck + gameState.track3.widthCheck)
        {
          gameState.playNote(gameState.track3, button, this.player);
        }
        game.add.existing(new MusicParticle(this.player.x, this.player.y-32));
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

  },

  playNote: function(track, button, player) {

    //Find Lowest Note
    var checkNote;
    for(var i = 0; i < track.length; i++)
    {
      if(!checkNote)
        checkNote = track.getAt(i);
      else {
        if(track.getAt(i).body.y > checkNote.body.y)
          checkNote = track.getAt(i);
      }
    }

    if(checkNote)
    {
      //If it's in range to be played
      var accuracy = Math.abs(391 - checkNote.y);
      if(accuracy < 15)
      {
        //If you're holding the right instrument
        if(checkNote.instrument === player.instrument.id)
        {
          //If the player hit the right button
          if(checkNote.buttonNumber === button)
          {
            checkNote.succeed(accuracy);
          }
          else
          {
            checkNote.fail();
          }
        }
        else {
          console.log('Wrong Instrument');
        }
      }
      else {
        //PLAY BAD NOISE
      }
    }

  },

  bloom: function(x, color) {

    if(color === 'gold') {bloomColor = '0xf4f274';}
    else {bloomColor = '0xFFFFFF';}

    var bloom = game.add.graphics(x-35, 391-12.5, gameState.effectsGroup);
    bloom.beginFill(bloomColor, 1);
    bloom.drawRect(0, 0, 70, 25);
    bloom.endFill();

    game.add.tween(bloom).to( { alpha: 0 }, 1000, "Linear", true);
    game.time.events.add(1000, function() {
      bloom.destroy();
    }, this);

  }

};
