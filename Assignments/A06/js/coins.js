var Coins = function () {
    this.game = game;
    this.num_coins = n;
    this.x_coord = x;
    this.y_coord = y;
    this.coins = [];
    this.spawnCoin(x,y)
}
Coins.prototype.spawnCoin = function (x, y) {


    // randomish location
    var x =  getRandomInt(100, 4000);
    var y =  getRandomInt(150, 4000);
console.log("hekjn,m")
    // add sprite to game
    var coin = this.game.add.sprite(x, y, 'coins');
    this.game.physics.arcade.enable(coin);
    coin.scale.setTo(1);

    // add ALL the above animations to every ghost sprite
    // (we only play the correct color for each ghost)

}
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}