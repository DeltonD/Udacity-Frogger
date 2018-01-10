// Enemies our player must avoid
var allEnemies = [];
var Player = function() {
	this.init();
	this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt){
	this.x = this.col * 101;
	this.y = this.row * 83 - 40;
};
Player.prototype.handleInput = function(keyC){
	switch(keyC){
		case 'up':
			this.row > 0 ? this.row-- : 0; //if row is bigger than 0, the row is incremented
			break;
		case 'down':
			this.row < 5 ? this.row++ : 0;
			break;
		case 'left':
			this.col > 0 ? this.col-- : 0;
			break;
		case 'right':
			this.col < 4 ? this.col++ : 0;
			break;
	}	
};
Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.init = function(){
	this.col = 2;
	this.row = 5;
	this.x = this.col * 101;
	this.y = this.row * 83;
};
Player.prototype.isColliding = function(){
	allEnemies.forEach(function(enemy) {
		if(player.x 
    });
	return false;
};
var Enemy = function(lane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.speed = Math.floor((Math.random() * 200) + 50);
	this.x = -101;
	this.y = lane * 80 + 50;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
	if(this.x > 505){
		this.init();
	}
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.init = function(){
	this.x = -101;
	this.speed = Math.floor((Math.random() * 200) + 50);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
var player = new Player();
for(i = 0; i < 3; i++){
	allEnemies.push(new Enemy(i));
}	


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
