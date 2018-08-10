var preload = {
	preload:function(){
		console.log("preload.js");
		game.stage.backgroundColor = game.globals.bg_color;

		var loading_border = this.add.image(game.width/2,game.height/2,'loading_border')
		loading_border.anchor.setTo(.5,.5)
		var loading = this.add.sprite(game.width/2,game.height/2,'loading')
		loading.anchor.setTo(.5,.5)
		this.load.setPreloadSprite(loading)
		game.load.spritesheet('death_fire', 'assets/sprites/death_fire.png', 80, 80);
		
		// game entities/world
		game.load.image('pause', 'assets/images/pause.png')
		game.load.image('planet8', 'assets/sprites/p11.png')
		game.load.image('space', 'assets/images/space.jpg')
		game.load.image('bullet', 'assets/sprites/muzzleflash6.png');
		game.load.image('starfield', 'assets/images/starfield.png');
		game.load.image('t1', 'assets/sprites/t3.jpg');
		game.load.atlas('fire_ball', 'assets/sprites/fire_ball.png', 'assets/sprites/fire_ball.json');
		game.load.image('t2', 'assets/sprites/t7.jpg');
		game.load.image('space1', 'assets/sprites/sm.png');
		game.load.spritesheet('space2', 'assets/sprites/spaceman1.jpg',187.5,229);
		game.load.spritesheet('space3', 'assets/sprites/spaceman2.jpg',133.3,133.3);
		game.load.spritesheet('p12', 'assets/sprites/p12.jpg',96,80);

		// Load all my new obstacles
		for(i=0;i<game.globals.obstacle_icons.length;i++){
			name = game.globals.obstacle_icons[i];
			game.load.image('icon-'+name, 'assets/images/icon-'+name+'.png');
		}


	//	game.load.spritesheet('kaboom', 'assets/sprites/explode.png', 128, 128);
		game.load.spritesheet('kaboom', 'assets/sprites/explosion.png', 64, 64);
		//game.load.spritesheet('earth', 'assets/sprites/Earth.png', 213,160,13);
		game.load.spritesheet('earth', 'assets/sprites/Earth4.png', 85,85,48);
		game.load.spritesheet('planet', 'assets/sprites/planets.jpg', 166.5,200);
		game.load.spritesheet('planet1', 'assets/sprites/planets1.jfif', 64.5,65);
		game.load.spritesheet('planet2', 'assets/sprites/earth.png', 213,160);
		game.load.spritesheet('planet3', 'assets/sprites/planets3.png', 255.5,251.3);
		game.load.spritesheet('planet4', 'assets/sprites/planets4.jpg', 85.3,108.75);
		game.load.spritesheet('planet5', 'assets/sprites/planets5.png', 72,73);
		game.load.spritesheet('planet6', 'assets/sprites/planets6.jpg', 85.3,108.75);
		game.load.spritesheet('planet7', 'assets/sprites/planets7.png', 64,64);
		game.load.atlas('ufoAtlas','assets/sprites/ufo-sheet_2.png','assets/sprites/ufo-atlas_2.json');

		// audio
		game.load.audio('bg_spin', 'assets/sounds/spin_bg_music.mp3')
		game.load.audio('bg_edm', 'assets/sounds/edm_bg_music.mp3')
		game.load.audio('score', 'assets/sounds/score.wav')
		game.load.audio('kill', 'assets/sounds/Ouch.ogg')
		game.load.audio('music', 'assets/sounds/abstractionRapidAcrobatics.wav')

		// font
		game.load.bitmapFont('fontUsed', 'assets/font/ganonwhite/font.png', 'assets/font/ganonwhite/font.xml');

	},
	
	create:function(){
		game.state.start('mainMenu');
	}
}