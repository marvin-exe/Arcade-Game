"use strict";
// Enemies our player must avoid
var Enemy = function(xcor, ycor, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.xcor = xcor;
    this.ycor = ycor;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    this.xcor += this.speed*dt;
    this.xcor = this.xcor>500?0:this.xcor;
    this.crashCheck();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xcor, this.ycor);
};

// Checks enemy collision with player
Enemy.prototype.crashCheck = function() {
    if (player.xcor + 26 <= this.xcor + 90 && player.xcor + 77 >= this.xcor + 10 && player.ycor + 130 >= this.ycor + 92 && player.ycor + 72 <= this.ycor + 132) {
        document.getElementById("deaths").innerHTML = ++deaths;
        restartGame();
    }
};

// Player class
var Player = function(xcor, ycor, speed) {
    this.xcor = xcor;
    this.ycor = ycor;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(xcorNew, ycorNew) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xcor, this.ycor);
};
Player.prototype.reset = function() {
    this.xcor = 200;
    this.ycor = 410;
    this.speed = 90;
};
// Player controls
Player.prototype.handleInput = function(keypressed) {
    if (keypressed == 'left') {
        this.xcor -= this.speed;
        if (this.xcor < 2) {
            this.xcor = 2;
        }
    }
    else if (keypressed == 'right') {
        this.xcor += this.speed;
        if (this.xcor > 400) {
            this.xcor = 400;
        }
    }
    else if (keypressed == 'up') {
        this.ycor -= this.speed;
        if (this.ycor <= (25)) {
            winGame();
            return;
        }
    }
    else if (keypressed == 'down') {
        this.ycor += this.speed;
        if (this.ycor > 410) {
            this.ycor = 410;
        }
    }
};

var allEnemies = [];
var player = new Player(0, 0, 0);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function winGame() {
    player.reset();
    score += 1;
    document.getElementById("score").innerHTML = score;
    var probability = parseInt(Math.random()*10);
    if (probability < 5 && allEnemies.length < 5) {
        allEnemies.push(new Enemy(0,40 + Math.random()*100,40 + Math.random()*100));
    }
}

function restartGame() {
    player.reset();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0,40 + Math.random()*100,40 + Math.random()*100),
        new Enemy(0,60 + Math.random()*100,60 + Math.random()*100),
        new Enemy(5,50 + Math.random()*130,70 + Math.random()*100)
        );
}

var score = 0;
var deaths = 0;
restartGame();
