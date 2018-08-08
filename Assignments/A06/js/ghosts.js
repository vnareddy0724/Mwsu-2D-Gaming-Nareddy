/**
 * 
 * @param {object} game - phaser game object
 * @param {int} n - number of ghosts to create
 * @param {int} x - general x coord to spawn around
 * @param {int} y - general y coord to spawn around
 */
var Ghosts = function (game, n, x, y,layer) {
    this.game = game;
    this.num_ghosts = n;
    this.x_coord = x;
    this.y_coord = y;
    this.ghosts = [];
    this.mummies=[];
    this.mummies1=[]
    this.healthCount=false
    this.l=layer;
    this.coinarray=[]
    this.coinHit=false
    this.spinHit=false
    this.coinarray1=[]
    this.devils=[]
    this.anims = {
        0: [0, 1], // red up
        1: [2, 3], // red down
        2: [4, 5], // red left
        3: [6, 7], // red right
        4: [8, 9], // pink up
        5: [10, 11], // pink down
        6: [12, 13], // pink left
        7: [14, 15], // pink right
        8: [16, 17], // blue up
         9: [18, 19], // blue down
        10: [20, 21], // blue left
        11: [22, 23], // blue right
        12: [24, 25], // orange up
        13: [26, 27], // orange down
        14: [28, 29], // orange left
        15: [30, 31] // orange right 
    };
console.log("location "+this.x_coord+" "+y)
 
   // this.spawnGhosts(n, x, y);
    this.spawnMumy(n,x,y);
  //  this.spawnDevil(n,x,y);
    this.spawnCoins()
}

/**
 * This function loops through the array of "ghosts" and
 * calls the moveGhostTowardPlayer function with the correct
 * ghost index, sprite, and its speed.
 * @param: ghosts - array of sprites
 */
Ghosts.prototype.moveGhosts = function (player) {
    this.player = player;
   
    for (i = 0; i < this.ghosts.length; i++) {
        if (this.ghosts[i].inCamera) {
           // console.log("ghosts len"+this.ghosts.length)
            this.moveGhostTowardPlayer(this.ghosts[i]);
        }
    }
}
Ghosts.prototype.moveMummies = function (player) {
    this.player = player;
   
    for (i = 0; i < this.mummies.length; i++) {
        if (this.mummies[i].inCamera) {
           // console.log("ghosts len"+this.ghosts.length)
            this.moveTowardPlayer1(this.mummies[i],90);
        }
    }
  
  
}
Ghosts.prototype.moveDevils = function (player) {

    for (i = 0; i < this.devils.length; i++) {
        if (this.devils[i].inCamera) {
           // console.log("ghosts len"+this.ghosts.length)
            this.moveTowardPlayer1(this.devils[i],160);
        }
    }

}
Ghosts.prototype.moveGhostTowardPlayer1 = function (enemy) {
   /*  var xdiff = Math.abs(this.player.x - ghost.x);
    var ydiff = Math.abs(this.player.y - ghost.y); */

    enemy.x=this.player.x-100;
    if(this.player.x < enemy.x){
        enemy.body.velocity.x = -200;
    }else{
        enemy.body.velocity.x = 200;
    }
    if(this.player.y < enemy.y){
        enemy.body.velocity.y = -200;
    }else{
        enemy.body.velocity.y = 200;
    }




}
/**
 * This uses the 'movePlayer' method, but adds the logic to change
 * the ghosts animation so that the eyes are looking at you.
 * @param: i - int ghost index
 * @param: ghost - phaser sprite
 */
Ghosts.prototype.moveGhostTowardPlayer = function (ghost) {
    // get differences in x and y locations between enemy and player
    var xdiff = Math.abs(this.player.x - ghost.x);
    var ydiff = Math.abs(this.player.y - ghost.y);

    // Frame to play
    var key = 0;

    // if x difference is greater than y, we will change eyes left to right
    if (xdiff > ydiff) {
        console.log("movingx")
        // set left right value
        if (this.player.x < ghost.x) {
            key = 2;
        } else {
            key = 3;
        }
        // change eyes up and down if y values differe more
    } else {
        console.log("movingy")
        // set up down value
        if (this.player.y < ghost.y) {
            key = 0;
        } else {
            key = 1;
        }
    }

    // we add (i*4) to get to the correct color on sprite sheet
    // then mod by 16
    // We could do (i % 4) * 4 as well to get correct color and frame.
    key += (i * 4) % 16;

    // each ghosts speed is stored "in" the ghost
    this.moveTowardPlayer(ghost, ghost.data['speed']);
    ghost.animations.play(key);
}

/**
 * Very basic move monster towards player function.
 * @param: enemy - phaser sprite
 * @param: speed - int how fast you want to move
 */
Ghosts.prototype.moveTowardPlayer = function (enemy, speed) {
    // get differences in x and y locations between enemy and player
    var xdiff = Math.abs(this.player.x - enemy.x);
    var ydiff = Math.abs(this.player.y - enemy.y);

    // Arbitrary buffer
    var buffer = 5;

    // If the enemy is within buffer distance, set velocity to 
    // zero so we don't get the jerky left / right behavior
    if (xdiff < buffer) {
        enemy.body.velocity.x = 0;
    } else {
        // Change velocity to keep moving toward player
        if (this.player.x < enemy.x) {
            enemy.body.velocity.x = -speed;
        } else {
            enemy.body.velocity.x = speed;
        }
    }
    // If the enemy is within buffer distance, set velocity to 
    // zero so we don't get the jerky up / down behavior		
    if (ydiff < buffer) {
        enemy.body.velocity.y = 0;
    } else {
        // Change velocity to keep moving toward player
        if (this.player.y < enemy.y) {
            enemy.body.velocity.y = -speed;
        } else {
            enemy.body.velocity.y = speed;
        }
    }

   
}


Ghosts.prototype.moveTowardPlayer1 = function (enemy, speed) {
    // get differences in x and y locations between enemy and player
    var xdiff = Math.abs(this.player.x - enemy.x);
    var ydiff = Math.abs(this.player.y - enemy.y);

    // Arbitrary buffer
    var buffer = 5;

    // If the enemy is within buffer distance, set velocity to 
    // zero so we don't get the jerky left / right behavior
    if (xdiff < buffer) {
        enemy.body.velocity.x = 0;
    } else {
        // Change velocity to keep moving toward player
        if (this.player.x < enemy.x) {
            enemy.body.velocity.x = -speed;
            enemy.play('walk_left')
        
        } else {
            enemy.body.velocity.x = speed;
            enemy.play('walk_right')
        }
    }
    // If the enemy is within buffer distance, set velocity to 
    // zero so we don't get the jerky up / down behavior		
    if (ydiff < buffer) {
        enemy.body.velocity.y = 0;
    } else {
        // Change velocity to keep moving toward player
        if (this.player.y < enemy.y) {
            enemy.body.velocity.y = -speed;
        } else {
            enemy.body.velocity.y = speed;
        }
    }

   
}






/**
 * Generates an array of "ghosts". Could be any sprite.
 * @param: n - number of ghosts
 * @param: x - x coord for a spawn location
 * @param: y - y coord 
 * @returns: array of ghost sprites
 */

Ghosts.prototype.spawnMumy = function (n, x, y) {
    this.m1 = this.game.add.group();

    this.game.physics.enable(this.m1, Phaser.Physics.ARCADE);
    for (i = 0; i < 1; i++) {
        var m = game.add.sprite(303, 215, 'ms2');
      
       game.physics.arcade.enable(m);
       m.animations.add('walk_right',[22,23,24,25,26]);
       m.animations.add('walk_left',[30,31,32,33,34]);
       m.animations.play('walk_right',10, true);
       m.animations.play('walk_left',10, true);
        this.mummies.push(m)

    }

  /*   for (i = 0; i < 1; i++) {

        var m = game.add.sprite(303, 215, 'ms');
      
       game.physics.arcade.enable(m);
       m.animations.add('run');
       m.animations.play('run', 10, true);
        this.mummies1.push(m)

    } */
   
   
}
Ghosts.prototype.spawnDevil = function (n, x, y) {
    this.m2 = this.game.add.group();

    this.game.physics.enable(this.m2, Phaser.Physics.ARCADE);
    for (i = 0; i < 1; i++) {
        var m = game.add.sprite(403, 215, 'd');
      
       game.physics.arcade.enable(m);
       m.animations.add('walk_right',[6,7,8]);
       m.animations.add('walk_left',[3,4,5]);
       m.animations.play('walk_right',10, true);
       m.animations.play('walk_left',10, true);
        this.devils.push(m)

    }
}


Ghosts.prototype.spawnGhosts = function (n, x, y) {


    for (i = 0; i < 3; i++) {
        // create the ghost
       
        var g = this.spawnGhost(x, y, i);
            
            
        // choose proper frame to alternate colors
        var anim = (i * 4) % 16;
        console.log("spawns")
        this.game.physics.arcade.enable(g);
        // play animation
        g.animations.play(anim);
        // put necessary values in the data object in the ghost
        g.data['id'] = i;
        g.data['speed'] = 100 + getRandomInt(-75, 75);

        // push ghost on to the array
        this.ghosts.push(g);

    }
    // return array of ghosts

}

/**
 * This method spawns one ghost at some random location near x,y
 * @param: x - int x coord
 * @param: y - int y coord
 * @returns: ghost sprite
 */
Ghosts.prototype.spawnGhost = function (x, y) {


    // randomish location
    var x1 = x + getRandomInt(x - 100, x + 150);
    var y1 = y + getRandomInt(y - 150, y + 100);


        //x1=698.5000000000018;
        //y1=540.7999999999981
console.log("spawn x"+x1)
    // add sprite to game
    var ghost = this.game.add.sprite(x1, y1, 'ghosts');
    this.game.physics.arcade.enable(ghost);
    ghost.scale.setTo(.4);

    // add ALL the above animations to every ghost sprite
    // (we only play the correct color for each ghost)
    for (var key in this.anims) {
        ghost.animations.add(key, this.anims[key], 20, true);
    //    console.log("ghost"+this.player[health])
    }

    // return ghost
    return ghost;
}
Ghosts.prototype.spawnCoins = function () {

    console.log("coins"+x+"y"+y)
   
    // randomish location
    for(var i=0;i<50;i++){
        var x = getRandomInt(100, 4050);
        var y = getRandomInt(150, 4100);
    
        // add sprite to game
        //console.log("coins"+x+"y"+y)
       
      
        if(this.l.getTileProperties1('layer_collision',x,y)==null){
            var coin = this.game.add.sprite(x, y, 'coins');
            this.game.physics.arcade.enable(coin);
            coin.scale.setTo(1);
           this.coinarray.push(coin)
          // console.log(this.coinarray[0].data+"copin details")
            //  Now let's add 50 coins into it
           
        }
        else{
           
        }
        
    }
    this.coins = this.game.add.group();
    this.game.physics.enable(this.coins, Phaser.Physics.ARCADE);
    this.obstacles = game.add.group()
    for (var i = 0; i < 100; i++)

    {
        var x = getRandomInt(100, 4050);
        var y = getRandomInt(150, 4100);
        if(this.l.getTileProperties1('layer_collision',x,y)==null){
           var coin = this.game.add.sprite(x, y, 'coins');
           this.game.physics.arcade.enable(coin);
           coin.scale.setTo(1);
        //this.coins.create(x, y, 'coins', 0);
        this.coinarray1.push(coin)
        this.coins.add(coin)
        }
    }

    //  Now using the power of callAll we can add the same animation to all coins in the group:
   
   
        this.coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
    //  And play them
    this.coins.callAll('animations.play', 'animations', 'spin');
   
    
    // add ALL the above animations to every ghost sprite
    // (we only play the correct color for each ghost)
   /*  for (var key in this.anims) {
        ghost.animations.add(key, this.anims[key], 20, true);
    //    console.log("ghost"+this.player[health])
    } */
   
    // return ghost
    return coin;
}


Ghosts.prototype.killCoins=function(player){
    for(var i=0;i<this.coinarray.length;i++){

        this.game.physics.arcade.overlap(this.coinarray[i],player,this.collectCoin,null,this);
    }
    for(var i=0;i<this.coinarray1.length;i++){

        this.game.physics.arcade.overlap(this.coinarray1[i],player,this.collectCoin1,null,this);
    }
   
   
  
}
Ghosts.prototype.killGhosts=function(player){

    for(var i=0;i<this.ghosts.length;i++){
        console.log("ghost kill"+this.ghosts.length)
        this.game.physics.arcade.overlap(this.ghosts[i],player,this.collectGhost,null,this);
    }

    for(var i=0;i<this.mummies.length;i++){

        this.game.physics.arcade.overlap(this.mummies[i],player,this.collectGhost,null,this);
    }
    for(var i=0;i<this.devils.length;i++){

        this.game.physics.arcade.overlap(this.devils[i],player,this.collectGhost,null,this);
    }

}

Ghosts.prototype.collectGhost=function(ghost){
   // console.log(coin+"coin hitted")
        ghost.kill()
        this.healthCount=true
}


Ghosts.prototype.collectCoin=function(coin){
    console.log(coin+"coin hitted")
        coin.kill()
        this.coinHit=true
}
Ghosts.prototype.collectCoin1=function(coin){
    console.log(coin+"coin hitted")
        coin.kill()
        this.spinHit=true
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}