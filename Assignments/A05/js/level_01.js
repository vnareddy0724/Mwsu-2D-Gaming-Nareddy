var level_01 = {

	preload: function () {

	},
	create: function () {
		console.log("level_01.js");
		this.jumpTimer = 0
		this.jump = false
		this.count = 0
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.prevDir = 'right';	// holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left', 0, 9), 20, true);
		this.player.animations.add('run_right', Phaser.Animation.generateFrameNames('Run_right', 0, 9), 20, true);
		this.player.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 20, false);
		this.player.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 20, false);
		this.player.animations.add('jumpattack_left', Phaser.Animation.generateFrameNames('JumpAttack_left', 0, 9), 20, false);
		this.player.animations.add('jumpattack_right', Phaser.Animation.generateFrameNames('JumpAttack_right', 0, 9), 20, false);
		this.player.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, true);
		this.player.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, true);
		this.player.animations.add('die', Phaser.Animation.generateFrameNames('Dead', 1, 10), 20, false);
		this.player.animations.play('idle_left');
		this.dead = false;
this.run=false
		// turn physics on for player
		game.physics.arcade.enable(this.player);
		game.input.mouse.capture = true;
		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);

		game.addPauseButton(game);
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
	},

	update: function () {

		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

		// Use the shift key to add running by changing speed and animation
		if (!this.dead) {

			// Create a move class or function to clean up code.
			if (this.leftKey.isDown && this.upKey.isUp) {
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 0;
				this.player.animations.play('walk_left');
				this.prevDir = 'left'
				console.log("left up")
			}
			if (this.leftKey.isDown && this.upKey.isDown) {
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = -200;
				this.player.animations.play('walk_left');
				this.prevDir = 'left'
				console.log("left")
			}
			if (this.leftKey.isDown && this.downKey.isDown) {
				this.player.body.velocity.x = -200;
				this.player.body.velocity.y = 200;
				this.player.animations.play('walk_left');
				this.prevDir = 'left'
				console.log("left")
			}
			if (this.rightKey.isDown && this.upKey.isDown) {
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = -200;
				this.player.animations.play('walk_right');
				this.prevDir = 'right'
				console.log("left")
			}
			if (this.rightKey.isDown && this.downKey.isDown) {
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 200;
				this.player.animations.play('walk_right');
				this.prevDir = 'right'
				console.log("left")
			}
			if (this.rightKey.isDown && this.upKey.isUp && this.downKey.isUp) {
				this.player.body.velocity.x = 200;
				this.player.body.velocity.y = 0;
				this.player.animations.play('walk_right');
				this.prevDir = 'right'
			}
			if (this.upKey.isDown && this.leftKey.isUp && this.rightKey.isUp) {
				if (this.prevDir == 'left') {
					this.player.animations.play('walk_left');
				} else {
					this.player.animations.play('walk_right');
				}
				console.log("up left")
				this.player.body.velocity.y = -200;
			}
			if (this.downKey.isDown && this.leftKey.isUp && this.rightKey.isUp) {
				if (this.prevDir == 'left') {
					this.player.animations.play('walk_left');
				} else {
					this.player.animations.play('walk_right');
				}
				this.player.body.velocity.y = 200;
			}

			if (!this.leftKey.isDown && !this.rightKey.isDown && !this.upKey.isDown && !this.downKey.isDown && !this.run) {
				if (this.prevDir == 'left') {
					this.player.animations.play('idle_left');
				} else {
					this.player.animations.play('idle_right');
				}
				this.player.body.velocity.x = 0;
				//this.player.body.velocity.y = 0;
				/* if(this.jump== true){
					this.player.body.velocity.y = 300;
					/* this.count++
					if(this.count==2){
						this.jump=false;
						this.count=0;
						this.player.body.velocity.y = 300;
					} */

			console.log("hjgjhm")

				this.player.body.velocity.y = 0;

				//	console.log("y1")
			}
if(this.shiftKey.isUp){
	this.run=false
}
			if (this.shiftKey.isDown) {


				if (this.prevDir == 'left') {
					//console.log("shift")
					//this.player.body.velocity.x = 0;
					this.player.animations.play('walk_left');
					this.player.body.velocity.x = -350;
					this.player.body.velocity.y = 0;
					console.log("run")
					this.run=true
				}
				else {
					this.player.animations.play('run_right');
					this.player.body.velocity.x = 350;
					this.player.body.velocity.y = 0;
					this.run=true
				}
			}
			/* 	if( this.jump == true){
				   console.log("y")
				   //this.player.animations.play('jump_left');
				   //this.player.body.velocity.x = -50;
			   	
				   this.player.body.velocity.y = 250;
				   //this.player.body.gravity.y = 9 - 4; 
				   this.jump=false
			   }  */
			if (this.spaceBar.isDown && !game.input.activePointer.isDown) {
				//this.player.body.velocity.y = 0;
				if (this.prevDir == 'left') {
					this.jumpStart('jump_left',this.jumpFinish);
					this.jump = true;
				}
				if (this.prevDir == 'right') {
				//	console.log("he is right2")
					this.jumpStart('jump_right',this.jumpFinish);
					this.jump = true;
				}


			}
			if (this.spaceBar.isDown  && game.input.activePointer.isDown ) {
				//this.player.body.velocity.y = 0;
				if (this.prevDir == 'left') {
					this.jumpStart('attack_left',this.jumpFinish);
					
					this.jump = true;
				}
				if (this.prevDir == 'right') {
					console.log("he is right1nbbbbbbbbbbbbbbbbbb")
					this.jumpStart('attack_right',this.jumpFinish);
					
					this.jump = true;
				}


			}

			if (this.xKey.isDown) {

				this.player.animations.play('die');
				//this.player.body.velocity.y = 0;
				//this.player.body.velocity.x = 0;
				this.dead = true
			}
			if (game.input.activePointer.isDown) {
				//	console.log("x")
				this.player.body.velocity.x=0
				this.player.body.velocity.y=0

				if (this.prevDir == 'left') {
					this.player.animations.play('attack_left');
					//this.player.body.velocity.x = -50;
				}
				else {
					this.player.animations.play('attack_right');
				}




			}
		}


	},
	jumpStart: function(direction,callback){
		console.log("jumpstart")
		this.player.y -= 10;
		this.player.animations.play(direction);
		
		game.time.events.add(Phaser.Timer.SECOND * .1, callback, this);
		//this.player.animations.play(direction);
	},
	jumpFinish: function (context) {
		console.log("jumping callback")
		this.player.y += 10;
	},
	render: function () {
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("Use arrow keys to move sprite around.", game.width / 2, game.height - 10);
	}
}