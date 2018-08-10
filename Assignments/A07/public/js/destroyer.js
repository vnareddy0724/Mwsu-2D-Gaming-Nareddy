var destroyer = {
	init: function () {
		game.stage.disableVisibilityChange = true;
	},

	create: function () {
		console.log("destroyer.js");
		console.log(game.others);

		Client.sendNewPlayerRequest();

		this.player = new Ufo(game);
		this.player1 = new Ufo1(game);
		this.pid = null;

		// erase the others?
		if (game.others != 'object') {
			game.others = {};
		}
		this.deathFire = game.add.sprite(this.player.x, this.player.y, 'death_fire');
		this.deathFire.animations.add('fry', 0, 8);
		this.deathFire.alpha = 0;
		this.deathFire.anchor.setTo(0.5);
		w = game.width // Game width and height for convenience
		h = game.height
		frame_counter = 0 // variable to help with the creation of obstacles
		this.barxoffset = 0;
		//this.player.body.setSize(60, 60, 0, 0);
		console.log(this.player.x + "pla x")
		this.baryoffset = -35;
		//used for points right now
		this.item_destroyed = false;
		this.health = 100
		this.health1 = 100
		//	this.createPlayer(x, y, atlas);
		this.healthBarConfig = this.createHealthBar();
		this.createHealthBar();
		this.renderHealthBar();
		this.healthBarConfig1 = this.createHealthBar1();
		this.createHealthBar1();
		this.renderHealthBar1();

		//  The scrolling starfield background
		this.starfield = game.add.tileSprite(0, 0, w, h, 'starfield');

		this.earth = game.add.sprite(0, 0, 'earth');

		this.earth.animations.add('spin', 0, 48);
		this.earth.animations.play('spin', 10, true);

		// Score sound
		this.sound.score = game.add.audio('score')
		this.sound.score.volume = .4

		// Death sound
		this.sound.kill = game.add.audio('kill')

		this.target = game.add.sprite(0, 420, 't1')
		this.target1 = game.add.sprite(765, 420, 't1')
		// Music
		this.music = game.add.audio('music')
		this.music.play('', 0, 0.5, true)

		this.physics.startSystem(Phaser.Physics.ARCADE)
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		game.physics.enable(this.player1, Phaser.Physics.ARCADE);
		// Obstacles (little icons of food)
		this.obstacles = game.add.group()


		//  An explosion pool that gets attached to each icon
		this.explosions = game.add.group();
		this.explosions.createMultiple(10, 'kaboom');
		this.explosions.forEach(this.setupObstacles, this);

		// Player
		//calls the create method of the ufo object
		this.player.create(randomInt(game.width / 4, game.width / 2), randomInt(100, game.height / 2), 0.75, 0.75);
		this.player1.create(randomInt(game.width / 2, game.width / 2), randomInt(100, game.height / 4), 0.75, 0.75);


		// Score label
		this.bmpText = game.add.bitmapText(game.width / 2, 100, 'fontUsed', '', 150);
		this.bmpText.anchor.setTo(.5, .5)
		this.bmpText.scale.setTo(.3, .3)

		///// Tracking keyboard inputs /////////////

		// Fire the ufo big laser when the 'X' key is pressed
		laserFire = this.input.keyboard.addKey(Phaser.Keyboard.X);
		laserFire.onDown.add(this.player.startLaser, this.player);

		// Assigns arrow keys for movement
		this.player1.assignMovementKeys(38, 40, 37, 39);

		// Assigns W,S,A,D keys for movement
		this.player.assignMovementKeys(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D);
		this.player1.assignFireKeys(Phaser.KeyCode.SPACEBAR);
		this.player.assignFireKeys(Phaser.KeyCode.SHIFT);

		this.pauseAndUnpause(game)
		this.A = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.S = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.D = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);


	},

	update: function () {

		//if (game.num_other_players > 0) {

		// Place score on game screen
		this.bmpText.text = game.globals.score

		// Move background to look like space is moving
		this.starfield.tilePosition.y -= 2;

		this.renderHealthBar()
		this.renderHealthBar1()
		if (this.A.isDown || this.D.isDown && this.b) {
			this.player.ship.body.gravity.x = 0
			this.player.allowGravity = false
			this.b = false
		}
		if (this.left.isDown && this.b1) {
			this.player1.ship.body.gravity.x = 0
			this.player1.allowGravity = false
			this.b1 = false
		}
		// Check for overlap between game ship and obstacles
		game.physics.arcade.overlap(this.player.ship, this.obstacles, this.killPlayer, null, this)
		game.physics.arcade.overlap(this.player1.ship, this.obstacles, this.killPlayer1, null, this)

		if (this.left.isDown) {
			game.physics.arcade.collide(this.player.ship, this.player1.ship, this.bump, null, this)
			this.b = true

		}
		else if (this.D.isDown) {
			game.physics.arcade.collide(this.player1.ship, this.player.ship, this.bump1, null, this)
			this.b1 = true

		}
		this.checkhealth()
		//	game.physics.arcade.collide(this.player1.ship, this.player.ship, this.bump1, null, this)
		// Check for overlap between bullets and obstacles
		this.count++
		if (this.count == 10 && this.collide == true) {
			this.count = 0
			console.log("gravity")
			//game.physics.arcade.gravity.x = 0;

			this.collide = false
		}
		game.physics.arcade.overlap(this.player.bullets, this.obstacles, this.destroyItem, null, this);
		game.physics.arcade.overlap(this.player1.bullets, this.obstacles, this.destroyItem, null, this);
		//	this.myHealthBar.setPosition(200,200);
		if (this.item_destroyed) {
			// Check to see if we score any points
			// needs changed since we added bullets
			game.globals.score += this.scorePoint();
			this.item_destroyed = false;
		}
		this.player.rotation = game.physics.arcade.angleToPointer(this.player);

		spawn_rate = 100 - game.globals.score; // how fast to add new obstacles to screen (smaller value = more obstacles)
		obstacle_speed = game.globals.score * 1.5 + 200; // how fast should each obstacle move

		// Spawn rate continuously shrinks so stop it at 5
		if (spawn_rate < 5) {
			spawn_rate = 5;
		}

		// Spawn obstacles
		if (frame_counter % spawn_rate == 0) {
			//console.log(spawn_rate);
			//console.log(obstacle_speed);
			this.spawnObstacle(game.rnd.integerInRange(32, game.width - 32), game.height, speed = obstacle_speed, 0.5, 0.5)
		}

		this.player.move();
		if (this.player.hasMoved()) {
			Client.sendPlayerPosition({
				pid: this.pid,
				x: this.player.ship.x,
				y: this.player.ship.y,
				angle: this.player.ship.angle
			});
		}

		this.player1.move();
		if (this.player1.hasMoved()) {
			Client.sendPlayerPosition({
				pid: this.pid,
				x: this.player1.ship.x,
				y: this.player1.ship.y,
				angle: this.player1.ship.angle
			});
		}


		frame_counter++;
		//}
	},

	render: function () {
		game.debug.body(this.player.ship);
		game.debug.body(this.player1.ship);
	},

	checkhealth: function () {

		if (this.health == 0) {
			//this.player.ship.kill()
			console.log("pl" + this.player.ship.x)
			this.player.ship.animations.add('kaboom');
			var explosion = this.explosions.getFirstExists(false);
			explosion.reset(this.player.ship.body.x, this.player.ship.body.y);
			explosion.play('kaboom', 10, false);
			this.player.ship.kill()

			timeText = this.add.text(200, 200, "00:00:00", { fontSize: '52px', fill: '#000' });
			timeText.setText("GAME OVER");
			game.paused = true
			//this.deathFire = game.add.sprite(this.player.ship.x, this.player.ship.y, 'kaboom');

			/*  this.deathFire.animations.add('fry',0,8);
			 this.deathFire.alpha = 0;
			 this.deathFire.anchor.setTo(0.5);
			 this.deathFire.animations.play('fry',30,true); */

		}
		if (this.health1 == 0) {
			//this.player.ship.kill()
			console.log("pl" + this.player.ship.x)
			this.player1.ship.animations.add('kaboom');
			var explosion = this.explosions.getFirstExists(false);
			explosion.reset(this.player1.ship.body.x, this.player1.ship.body.y);
			explosion.play('kaboom', 10, false);
			this.player1.ship.kill()

			timeText = this.add.text(200, 200, "00:00:00", { fontSize: '52px', fill: '#ffffff' });
			timeText.setText("GAME OVER");
			game.paused = true
			//this.deathFire = game.add.sprite(this.player.ship.x, this.player.ship.y, 'kaboom');

			/*  this.deathFire.animations.add('fry',0,8);
			 this.deathFire.alpha = 0;
			 this.deathFire.anchor.setTo(0.5);
			 this.deathFire.animations.play('fry',30,true); */

		}

	},
	/**
	 * Spawn New Player if its not the local player
	 */
	spawnNewPlayer: function (player) {
		console.log("Destroyer: spawnNewPlayer")
		console.log(player);
		if (typeof game.others != 'object') {
			game.others = {};
		}
		if (typeof player == 'object') {
			this.pid = player.pid;
			game.others[player.pid] = new Ufo(game);
			game.others[player.pid].create(player.x, player.y, 0.75, 0.75);
		}
		console.log(game.others);
	},

	moveOtherPlayers: function (player) {
		console.log("destroyer: moveOtherPlayers");
		console.log(game.others);
		if (typeof game.others == 'object') {
			if (typeof game.others[player.pid] == 'object') {
				game.others[player.pid].ship.x = player.x
				game.others[player.pid].ship.y = player.y;
				game.others[player.pid].ship.angle = player.angle;
			}
		}
	},
	bump: function () {

		console.log("bump")
		game.physics.arcade.enable([this.player.ship, this.player1.ship]);

		this.health = this.health - 1
		//	game.physics.arcade.gravity.x = -200;
		this.player.ship.body.gravity.x = -200
		this.player1.ship.body.gravity.x = 200

		//this.player.ship.setBounce(1)
		this.player.ship.body.bounce.x = 0.45;
		this.player1.ship.body.bounce.x = 0.45;
		this.player.ship.body.collideWorldBounds = true;
		this.player1.ship.body.collideWorldBounds = true;

		//this.player1.ship.body.allowGravity = false;
		//this.player1.ship.body.immovable = true;
		this.health = this.health - 1

		this.count = 0
		this.collide = true

		//
		game.input.onDown.add(this.toggleBody, this);
		//this.m1(this.m2)
		//ball.body.bounce.set(1);


	},
	bump1: function () {

		console.log("bump")
		game.physics.arcade.enable([this.player1.ship, this.player.ship]);


		this.player.ship.body.gravity.x = -200
		this.player1.ship.body.gravity.x = 200

		this.health1 = this.health1 - 1
		//this.player.ship.setBounce(1)
		this.player1.ship.body.bounce.x = 0.45;
		this.player1.ship.body.bounce.x = 0.45;
		this.player.ship.body.collideWorldBounds = true;
		this.player1.ship.body.collideWorldBounds = true;
		this.collide = true

		//
		game.input.onDown.add(this.toggleBody1, this);
		//this.m1(this.m2)
		//ball.body.bounce.set(1);


	},

	m1: function (callback) {
		console.log("callback")
		game.time.events.add(Phaser.Timer.SECOND * .5, callback, this);

	},

	m2: function () {

		console.log("callback")
		game.physics.arcade.gravity.x = 0;
		this.player.ship.allowGravity = false
		this.player1.ship.body.immovable = true;
	},
	toggleBody: function () {

		//	Here we simply disable the body entirely
		//	This stops all motion and collision checks against it
		//	without actually destroying the body object itself.

		if (this.player.ship.body.enable) {
			this.player.ship.body.enable = false;
		}
		else {
			this.player.ship.body.enable = true;
		}

	},
	toggleBody1: function () {

		//	Here we simply disable the body entirely
		//	This stops all motion and collision checks against it
		//	without actually destroying the body object itself.

		if (this.player1.ship.body.enable) {
			this.player1.ship.body.enable = false;
		}
		else {
			this.player1.ship.body.enable = true;
		}

	},
	checkPlayerCount: function (count) {
		console.log(count);
		console.log(game.others.length);
		if (game.others.length != count) {
			Client.sendPlayerRefresh();
		}
	},

	createHealthBar: function () {
		return {
			x: 100,
			y: 100,
			xoffset: -20,
			yoffset: 30,
			width: 50,
			height: 5,
			percent: 100
		};
	},
	createHealthBar1: function () {
		return {
			x: 400,
			y: 100,
			xoffset: -20,
			yoffset: 30,
			width: 50,
			height: 5,
			percent: 100
		};
	},

	/**
	 * Draw healthbar as configured
	 */
	renderHealthBar: function () {
		var width = this.healthBarConfig.width;
		var height = this.healthBarConfig.height;
		var xoff = this.healthBarConfig.xoffset;
		var yoff = this.healthBarConfig.yoffset;

		var hurt_ratio = 1 - (this.health / 100);

		if (typeof (this.healthbar) === 'object') {
			this.healthbar.destroy()
		}
		this.healthbar = game.add.graphics(100, 100);
		console.log("health bar" + this.health)
		if (hurt_ratio < 1) {
			console.log("health bar")
			//Draw green bar
			this.healthbar.lineStyle(2, 0x000000, 1);
			this.healthbar.beginFill(0x00FF00, 1);
			this.healthbar.drawRect(0 + xoff, 0 + yoff, width, height);
			this.healthbar.endFill();

			//Draw red bar
			this.healthbar.beginFill(0xFF0000, 1);
			this.healthbar.drawRect(0 + xoff, 0 + yoff, width * hurt_ratio, height);
			this.healthbar.endFill();
		} else {
			//Draw full red bar (this is only so bar will update position with player)
			this.healthbar.lineStyle(2, 0x000000, 1);
			this.healthbar.beginFill(0xFF0000, 1);
			this.healthbar.drawRect(0 + xoff, 0 + yoff, width, height);
			this.healthbar.endFill();
		}


	},
	renderHealthBar1: function () {
		var width = this.healthBarConfig1.width;
		var height = this.healthBarConfig1.height;
		var xoff = this.healthBarConfig1.xoffset;
		var yoff = this.healthBarConfig1.yoffset;

		var hurt_ratio = 1 - (this.health1 / 100);

		if (typeof (this.healthbar1) === 'object') {
			this.healthbar1.destroy()
		}
		this.healthbar1 = game.add.graphics(600, 100);
		console.log("health bar" + this.health)
		if (hurt_ratio < 1) {
			console.log("health bar")
			//Draw green bar
			this.healthbar1.lineStyle(2, 0x000000, 1);
			this.healthbar1.beginFill(0x00FF00, 1);
			this.healthbar1.drawRect(0 + xoff, 0 + yoff, width, height);
			this.healthbar1.endFill();

			//Draw red bar
			this.healthbar1.beginFill(0xFF0000, 1);
			this.healthbar1.drawRect(0 + xoff, 0 + yoff, width * hurt_ratio, height);
			this.healthbar1.endFill();
		} else {
			//Draw full red bar (this is only so bar will update position with player)
			this.healthbar1.lineStyle(2, 0x000000, 1);
			this.healthbar1.beginFill(0xFF0000, 1);
			this.healthbar1.drawRect(0 + xoff, 0 + yoff, width, height);
			this.healthbar1.endFill();
		}


	},


	/**
	 * spawn a new obstacle
	 * 
	 * @param x : x coord
	 * @param y : y coord
	 * @param speed : speed to move across game board
	 */
	spawnObstacle: function (x, y, speed, x_scale, y_scale) {
		// randomly choose an icon from an array of icon names
		var choice = game.rnd.integerInRange(0, 18 - 1);
		//var name = game.globals.obstacle_icons[choice];

		//create the obstacle with its randomly chosen name
		//var obstacle = this.obstacles.create(x, y, 'icon-' + name)\
		var c = game.rnd.integerInRange(0, 4 - 1);
		if (c == 0) {
			var obstacle = game.add.sprite(x, y, 'planet2')
			obstacle.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
			//obstacle.frame=choice
			obstacle.play('move', 10, true)
		}
		else if (c == 1) {
			var obstacle = game.add.sprite(x, y, 'planet1')
			//obstacle.animations.add('move',[0,1,2,3,4,5])
			obstacle.frame = choice
			//obstacle.play('move',10,true)
		}
		else if (c == 2) {
			var obstacle = game.add.sprite(x, y, 'planet5')
			obstacle.animations.add('move', 0, 48)
			//obstacle.frame=choice
			obstacle.play('move', 10, true)
		}
		else if (c == 3) {
			var obstacle = game.add.sprite(x, y, 'planet7')
			obstacle.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
			//obstacle.frame=choice
			obstacle.play('move', 10, true)
		}


		game.debug.body(obstacle);

		game.physics.enable(obstacle, Phaser.Physics.ARCADE)
		this.obstacles.add(obstacle)
		obstacle.enableBody = true
		obstacle.body.colliderWorldBounds = true
		obstacle.body.immovable = true
		obstacle.anchor.setTo(.5, .5)
		obstacle.scale.setTo(x_scale, y_scale)
		obstacle.body.setSize(obstacle.width + 20, obstacle.height - 20);
		obstacle.body.velocity.y = -speed

		obstacle.checkWorldBounds = true;

		// Kill obstacle/enemy if vertically out of bounds
		obstacle.events.onOutOfBounds.add(this.killObstacle, this);

		obstacle.outOfBoundsKill = true;
	},

	/**
	 * removes an obstacle from its group
	 */
	killObstacle: function (obstacle) {
		console.log("killed")
		this.obstacles.remove(obstacle);
	},

	/**
	 * Adds an explosion animation to each obstacle when created
	 */
	setupObstacles: function (obstacle) {
		obstacle.anchor.x = 0.5;
		obstacle.anchor.y = 0.5;
		obstacle.animations.add('kaboom');
	},

	/**
	 * Determines score. Needs changed
	 */
	scorePoint: function () {
		// silly but wanted a function in case points started
		// to change based on logic.
		return 1;
	},

	/**
	 * Kills player. Things commented out for debugging.
	 */
	killPlayer: function (player) {
		//issues with this
		//game.plugins.screenShake.shake(20);
		this.sound.kill.play('', 0, 0.5, false)
		//player.kill();
		//game.state.start('gameOver');
		this.health = this.health - 0.5
	},
	killPlayer1: function (player) {
		//issues with this
		//game.plugins.screenShake.shake(20);
		this.sound.kill.play('', 0, 0.5, false)
		//player.kill();
		this.health1 = this.health1 - 0.5
		//game.state.start('gameOver');
	},
	/**
	 * Source: https://phaser.io/examples/v2/games/invaders
	 * 
	 * Collision handler for a bullet and obstacle
	 */
	destroyItem: function (bullet, obstacle) {
		bullet.kill();
		obstacle.kill();
		var explosion = this.explosions.getFirstExists(false);
		explosion.reset(obstacle.body.x, obstacle.body.y);
		explosion.play('kaboom', 30, false, true);
		this.item_destroyed = true;
	},

	/**
	 * Tap on touchscreen or click with mouse
	 * not used for this game
	 */
	onDown: function (pointer) {
		console.log("clicked");



	},

	/**
	 * This method lets a user pause the game by pushing the pause button in
	 * the top right of the screen. 
	 */
	pauseAndUnpause: function (game) {
		var pause_button = game.add.sprite(game.width - 40, 40, 'pause')
		pause_button.anchor.setTo(.5, .5)
		pause_button.inputEnabled = true
		// pause:
		pause_button.events.onInputUp.add(
			function () {
				if (!game.paused) {
					game.paused = true
				}
				pause_watermark = game.add.sprite(game.width / 2, game.height / 2, 'pause')
				pause_watermark.anchor.setTo(.5, .5)
				pause_watermark.alpha = .1
			}, this)
		// Unpause:
		game.input.onDown.add(
			function () {
				if (game.paused) {
					game.paused = false
					pause_watermark.destroy()
				}
			}, self)
	}
}