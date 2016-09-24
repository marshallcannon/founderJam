var gameState = {

  preload: function() {

  },

  create: function() {

    //Advanced timing for fps display
    game.time.advancedTiming = true;

    //Start physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Start Controllers
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;
    pad2 = game.input.gamepad.pad2;
    console.log(pad1);

    //Players
    this.p1 = game.add.sprite(250, 400, 'player1');
    this.p2 = game.add.sprite(350, 400, 'player2');
    this.p1.anchor.setTo(0.5, 0.5);
    this.p2.anchor.setTo(0.5, 0.5);

  },

  update: function() {

    if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
        this.p1.x--;
    }
    else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
        this.p1.x++;
    }

    if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
        this.p2.x--;
    }
    else if (pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
        this.p2.x++;
    }

  },

  render: function() {

    game.debug.text(game.time.fps, 25, 25);

    game.debug.text('Controller 1: ' + pad1.connected, 25, 50);
    game.debug.text('Controller 2: ' + pad2.connected, 25, 75);

  },

  startLevel: function() {

  }

};
