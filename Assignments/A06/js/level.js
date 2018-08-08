/**
 * 
 * @param {object} game | phaser game object
 * @param {string} map_key | cache name
 * @param {string} map_path | path to json for tilemap
 * @param {string} mini_map_path | path to mini map image
 */
var Level = function (game, map_key,map_path,mini_map_path,collision_index) {
    this.game = game;
    this.map_key = map_key;
    this.map_path = map_path;
    this.mini_map_path = mini_map_path;
    this.mini_map_key = this.map_key+'_mini';
    this.map_collision_index = collision_index;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// PRELOAD ////////////////////////////////////////////////////////////////////////////////////////
Level.prototype.preload = function () {

    this.portalOverFlag = false;
    this.transport = false;
    this.count=100;

    this.mapjson = this.game.global.levels[this.map_key];
    console.log("map key "+this.map_key)

    this.mh = new MapHelper(game, this.map_key, this.map_path,this.map_collision_index);

    this.mh.preload();
    this.prevLayer='level_01'

  //  game.load.image(this.mini_map_key, this.mini_map_path);
}

Level.prototype.objectsCreation = function(){

}

///////////////////////////////////////////////////////////////////////////////////////////////////
// CREATE /////////////////////////////////////////////////////////////////////////////////////////
Level.prototype.create = function () {


    console.log("CREATING OBJRCTS"+this.back)
   // this.posx=403;
    //this.posy=215;
   
if(game.global.current_level!='level_03'){
    this.player = new Player(game, 530,215, 'knight_atlas');
}
else{
    this.player = new Player(game, game.camera.width/2+1000,game.camera.height/2+600, 'knight_atlas');
}
   
   

    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.player.alias.health=100
    this.map = this.mh.create();
   // this.coins= new Coins();
    
    this.mh.addCollisionLayer('layer_collision');

    this.mh.resizeWorld('layer_0_floor');

    this.hud = new Hud(game, 100, 200);

    this.hud.addTitle();
    this.hud.trackValue(this.player.alias, "health");
    this.hud.trackValue(this.player.alias, "coins", true);

   // this.mini_map = new MiniMap(game, 200, 200, 4096, 4096, this.mini_map_key, 'upper_right');

    game.camera.follow(this.player.alias);
    if(game.global.current_level=='level_05'){
      
        this.sprite=game.add.sprite(2312.9999999999927, 3126.799999999957, 'flag');
      
this.sprite1=game.add.sprite( 2236.3333333333226, 3001.6666666666893, 'flag');
this.sprite2=game.add.sprite( 2142.999999999985, 3515.000000000046, 'finish');
    }
    if(game.global.current_level == 'level_01'){
        this.portal = game.add.sprite(180, 180, 'red_portal');
        this.portal1 = game.add.sprite(2833.1666666666706, 2736.0000000000196, 'red_portal');
        this.portal2 = game.add.sprite(459.83333333333366, 1450.6666666666715, 'red_portal');
        this.portal3 = game.add.sprite(1616.500000000004, 3562.666666666679, 'red_portal');
    }
   else if(game.global.current_level == 'level_02'){
    this.portal = game.add.sprite(180, 180, 'red_portal');
    this.portal1 = game.add.sprite(1913.1666666666638, 362.6666666666678, 'red_portal');
    this.portal2 = game.add.sprite(2284.5000000000095, 960.800000000006, 'red_portal');
    this.portal3 = game.add.sprite(794.5, 1092.6666666666702, 'red_portal');
   }
   else if(game.global.current_level == 'level_03'){
    this.portal = game.add.sprite(game.camera.width/2+1200,game.camera.height/2+500, 'red_portal');
    this.portal1 = game.add.sprite(0.1666666666638, 0.6666666666678, 'red_portal');
    this.portal2 = game.add.sprite(0.5000000000095, 0.800000000006, 'red_portal');
    this.portal3 = game.add.sprite(0.5, 0.6666666666702, 'red_portal');
   }
   
else if(game.global.current_level == 'level_05'){
    this.portal = game.add.sprite(183.3333333333346,328.6666666666667, 'red_portal');
    this.portal1 = game.add.sprite(0.1666666666638, 0.6666666666678, 'red_portal');
    this.portal2 = game.add.sprite(0.5000000000095, 0.800000000006, 'red_portal');
    this.portal3 = game.add.sprite(0.5, 0.6666666666702, 'red_portal');
   }
   else if(game.global.current_level == 'level_04' ){
    this.portal = game.add.sprite(346.5000000000001, 207.33333333333346, 'red_portal');
    this.portal1 = game.add.sprite(1466.4999999999957,327.3333333333337, 'red_portal');
    this.portal2 = game.add.sprite(286.50000000000045, 3784.000000000058, 'red_portal');
    this.portal3 = game.add.sprite(3775.166666666654, 2544.000000000002, 'red_portal');
   }
   // this.portal = game.add.sprite(game.camera.width / 2 + 100, game.camera.height / 2 + 100, 'red_portal');
    this.portal.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 60, true);
    this.portal1.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 60, true);
    this.portal2.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 60, true);
    this.portal3.animations.add('rotate', Phaser.Animation.generateFrameNames('red_portal', 1, 3), 60, true);
    this.portal.animations.play('rotate');
    this.portal1.animations.play('rotate');
    this.portal2.animations.play('rotate');
    this.portal3.animations.play('rotate');
    // set the anchor for sprite to middle of the view
    this.portal.anchor.setTo(0.5);
this.monster=0
    // turn physics on for everyone
    game.physics.enable([this.player.alias, this.portal], Phaser.Physics.ARCADE);


    // Makes sure player sprite is in front of the map.
    this.player.bringToFront();

    // Spawn 7 ghosts when level loads
    
    this.ghosts = new Ghosts(game, 7, this.player.x, this.player.y,this.mh);
   
    // Track the ghosts on the mini map
 /*    for (i = 0; i < this.ghosts.ghosts.length; i++) {
        this.mini_map.trackEnemy(this.ghosts.ghosts[i]);
    } */

    console.log("key"+this.someVarName)
    
localStorage.setItem("someVarKey", this.someVarName);

}

///////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE /////////////////////////////////////////////////////////////////////////////////////////
Level.prototype.update = function () {

    // keeps hud in upper left of the screen 
    this.hud.displayHud()
    
    // keeps map updated in top right of the screen
   // this.mini_map.updatePlayerLocation(this.player.alias);

    // lets you control your player
    this.player.move();
    console.log("x"+this.player.alias.x)
    console.log("y"+this.player.alias.y)
    //2049.166666666652
// y1257.3333333333342
    if(this.player.alias.x <= 3091 && this.player.alias.x >= 3002 && this.monster<2 && game.global.current_level=='level_01'){
        console.log("monster")
       // this.ghosts.spawnGhosts(2,this.player.x,this.player.y)
      //  this.ghosts.spawnMummies(2,this.player.x,this.player.y)
        this.ghosts.spawnDevil(2,this.player.x,this.player.y)
       this.monster=this.monster+1
    
    }
   else if(this.player.alias.x <= 1903 && this.player.alias.x >= 1719 && this.monster<2 && game.global.current_level=='level_02'){
        console.log("monster")
        //this.ghosts.spawnGhosts(2,this.player.x,this.player.y)
        //this.ghosts.spawnMummies(2,this.player.x,this.player.y)
        this.ghosts.spawnDevil(2,this.player.x,this.player.y)
       this.monster=this.monster+1
    
    }
    else if(this.player.alias.x <= 1024 && this.player.alias.x >= 992 && this.monster<2 && game.global.current_level=='level_03'){
        console.log("monster")
      //  this.ghosts.spawnGhosts(2,this.player.x,this.player.y)
    //  this.ghosts.spawnMumy(2,this.player.x,this.player.y)
        this.ghosts.spawnDevil(2,this.player.x,this.player.y)
       this.monster=this.monster+1
    
    }
    else if(this.player.alias.y <= 1070 && this.player.alias.y >= 954 && this.monster<2 && game.global.current_level=='level_04'){
        console.log("monster")
      //  this.ghosts.spawnGhosts(2,this.player.x,this.player.y)
     // this.ghosts.spawnMumy(2,this.player.x,this.player.y)
        this.ghosts.spawnDevil(2,this.player.x,this.player.y)
       this.monster=this.monster+1
    
    }
    else if(this.player.alias.y <= 1315 && this.player.alias.y >= 565 && this.monster<2 && game.global.current_level=='level_05'){
        console.log("monster")
      //  this.ghosts.spawnGhosts(2,this.player.x,this.player.y)
     // this.ghosts.spawnMumy(2,this.player.x,this.player.y)
        this.ghosts.spawnDevil(2,this.player.x,this.player.y)
       this.monster=this.monster+1
    
    }

    this.ghosts.moveGhosts(this.player.alias);
    this.ghosts.moveMummies(this.player.alias);
    this.ghosts.moveDevils(this.player.alias);
   // this.ghosts.spawnCoins(this.player.alias.x,this.player.alias.y)
   // this.ghosts.spawnGhost(this.player.x,this.player.y)
 
    // checks if player intersects with a portal
    // hard coded destination. Needs improveds
 //console.log("bar"+this.player.alias.health)s
 this.ghosts.killCoins(this.player.alias)
 this.ghosts.killGhosts(this.player.alias)

 if(this.ghosts.coinHit){
     this.ghosts.coinHit=false
   //  this.player.alias.coinCount=this.player.alias.coinCount+5
   this.player.alias.data['coins']=this.player.alias.data['coins']+5
 }
 if(this.ghosts.spinHit){
    this.ghosts.spinHit=false
    this.player.alias.data['coins']=this.player.alias.data['coins']+10
}
    if(this.ghosts.healthCount){
      //  console.log("")
        
        this.player.alias.health=this.player.alias.health-1;
        
        this.ghosts.healthCount=false
    } 
    if(game.global.current_level=='level_05' && this.player.intersectsWith(this.portal)){
        this.prevLayer='level_04'
           
        game.global.current_level='level_04'
        game.state.start(game.global.current_level)
    }
   else if(game.global.current_level=='level_04' && this.player.intersectsWith(this.portal)){
        this.prevLayer='level_03'
           
        game.global.current_level='level_03'
        game.state.start(game.global.current_level)
    }
    else if(game.global.current_level=='level_03' && this.player.intersectsWith(this.portal)){
        this.prevLayer='level_02'
           
        game.global.current_level='level_02'
        game.state.start(game.global.current_level)
    }
   else if(game.global.current_level=='level_02' && this.player.intersectsWith(this.portal)){
        this.prevLayer='level_01'
           this.back=true
        game.global.current_level='level_01'
        game.state.start(game.global.current_level)
    }
   else if( game.global.current_level=='level_01' && this.player.intersectsWith(this.portal)){
        this.prevLayer='level_01'
           this.posx=this.player.alias.x+50
           this.posy=this.player.alias.y+30
        game.global.current_level='level_02'
        game.state.start(game.global.current_level)
    }
    
   else if (this.player.intersectsWith(this.portal)||this.player.intersectsWith(this.portal1)|| this.player.intersectsWith(this.portal2)
           || this.player.intersectsWith(this.portal3)) {
       // this.player.transportPlayer(1568, 1760);
       if( game.global.current_level=='level_01'){
           this.prevLayer='level_01'
           this.posx=this.player.alias.x+350
           this.posy=this.player.alias.y+430
        game.global.current_level='level_02'
       }
       else if( game.global.current_level=='level_02'){
        this.someVarName = "value";
        this.prevLayer='level_02'
        this.posx=this.player.alias.x+50
        this.posy=this.player.alias.y+30
        game.global.current_level='level_03'

       }
       else if( game.global.current_level=='level_04'){
        this.prevLayer='level_04'
        this.posx=this.player.alias.x+50
        this.posy=this.player.alias.y+30
        game.global.current_level='level_05'
       }
       
       game.state.start(game.global.current_level)
    }

   else  if(this.player.alias.x <= 27 && game.global.current_level =='level_03'){
        console.log("trsprt")
        game.global.current_level='level_04'
        game.state.start(game.global.current_level)
    }
   else  if(this.player.alias.x <= 27 && game.global.current_level =='level_05'){
        console.log("trsprt")
       // game.global.current_level='level_05'
       // game.state.start(game.global.current_level)
      // timeText = this.add.text(533, this.player.alias.y, "00:00:00", { fontSize: '52px', fill: '#000' });
       //timeText.setText("GAME OVER");
     //  this.player.alias.kill()
       gameOver.create()
    //  game.paused=true
       
    }
  else  if(this.player.alias.x >= 4058 && game.global.current_level =='level_03'){
        console.log("trsprt")
        game.global.current_level='level_04'
        game.state.start(game.global.current_level)
    }
  else  if(this.player.alias.y >= 3511 && game.global.current_level =='level_05'){
        console.log("trsprt")
       // game.global.current_level='level_05'
       // game.state.start(game.global.current_level)
        timeText = this.add.text(2142.999999999985, 3515.000000000046, "00:00:00", { fontSize: '52px', fill: '#000' });
        timeText.setText("YOU WON");
        //this.player.alias.kill()
     game.add.sprite(2042.999999999985, 3515.000000000046,'gameOver')
        game.paused=true
    }

    // Necessary to make sure we always check player colliding with objects
    game.physics.arcade.collide(this.player.alias, this.mh.collisionLayer);
}
Level.prototype.hitGhost = function(){

    console.log("hit")
}
///////////////////////////////////////////////////////////////////////////////////////////////////
// RENDER /////////////////////////////////////////////////////////////////////////////////////////
Level.prototype.render = function () {
    //game.debug.bodyInfo(this.player, 16, 24);
    // Instructions:
    //game.debug.text("And here is our new level!", game.width / 2, game.height - 10);
}