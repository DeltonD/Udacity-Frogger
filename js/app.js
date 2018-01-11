// Enemies our player must avoid
var allEnemies = [];
var loser = false;
/*
* Defines the score panel
* Initialize the wins counter and the lifes
* The .render function shows the panel on the game
*/
var Score = function(){
	this.lifes = "❤️❤️❤️";
	this.wins = 0;
};
Score.prototype.render = function(){
	ctx.fillStyle = '#3498db';
	ctx.font = '20px Arial';
	ctx.fillRect(0, 25, 505, 30);
		
	ctx.fillText(this.lifes,10,47); 

	ctx.fillStyle = 'black';
	ctx.fillText(`Score: ${this.wins}`,400,47);
		
	if(loser){
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 25, 505, 561);
		
		ctx.textAlign = 'center';
		ctx.fillStyle = 'black';
		ctx.fillText("You Lose 🙁",250,280);
		ctx.fillText(`Scoring ${score.wins} points`,250,310);
		
		ctx.fillStyle = '#3498db';
		ctx.fillRect(150, 320, 200, 50);
		ctx.fillStyle = 'black';
		ctx.fillText("Restart ⟳",250,350);
		ctx.textAlign = 'left';
	}
}
Score.prototype.init = function(){
	this.lifes = "❤️❤️❤️";
	this.wins = 0;
}
var score = new Score();

/*
* Defines the Player
* The .update function deal with the player position and if it is on the first row, the player wins and the score is incremented
* The next function handles the input, for each direction the row or the column is changed
* The .init function restarts the player position
* .isColliding checks if the player is colliding with a enemy by checking if they are on the same column and row, if so, the player is reseted and one life is decreased from the score
*/
var Player = function() {
	this.init();
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
	this.isColliding();
	this.x = this.col * 101;
	this.y = this.row * 83 - 40;
	
	if(this.row == 0){
		player.init();
		score.wins++;
	}
	
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
};
Player.prototype.isColliding = function(){
	allEnemies.forEach(function(enemy) {
		if(player.col == enemy.col && player.row - 1 == enemy.lane){
			player.init();
			if((score.lifes = score.lifes.replace('❤️', '')).length == 0){
				loser = true;
			}
		}
    });
};

/*
* Defines the Enemy Object
* If the enemy is off the canvas, the update function calls the .init
* The .init restarts the enemy position and assign him another random speed
*/
var Enemy = function(lane) {
	this.lane = lane;
	this.col = Math.round(this.x / 101);
	this.speed = Math.floor((Math.random() * 200 + score.wins * 2) + 50);
	this.x = -101;
	this.y = lane * 80 + 50;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x += this.speed * dt;
	this.col = Math.round(this.x / 101);
	if(this.x > 505){
		this.init();
	}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.init = function(){
	this.x = -101;
	this.speed = Math.floor((Math.random() * 200 + score.wins * 2) + 50);
}


// Now instantiate your objects.
var player = new Player();
for(i = 0; i < 3; i++){
	allEnemies.push(new Enemy(i));
}	


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("click",  function (e) {
	var cnv = ctx.canvas.getBoundingClientRect();
	var x = e.clientX - cnv.left;
	var y = e.clientY - cnv.top;

	if(x > 150 && x < 350 && y > 320 && y < 370){ //Checks if the cursor is over the button
		player.init();
		score.init();
		loser = false;
	}
});
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
