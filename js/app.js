// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  this.x = this.x > 500 ? 0 : this.x;
  this.crashCheck();
};

// check if player crashes into bug
Enemy.prototype.crashCheck = function() {
  if (player.x + 26 <= this.x + 90 && player.x + 77 >= this.x + 10 && player.y + 130 >= this.y + 92 && player.y + 72 <= this.y + 132) {
    document.getElementById("crashed").innerHTML = ++deaths;
    restartGame();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/char-boy.png"
}

Player.prototype.update = function(xUpdate, yUpdate){
  // player coordinates update
}

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
  this.x = 200;
  this.y = 410;
  this.speed = 90;
};

Player.prototype.handleInput = function(buttonPress){
  if (buttonPress == "left"){
    this.x -= this.speed;
    if (this.x < 2){
      this.x = 2;
    }
  }
  else if (buttonPress == "right"){
    this.x += this.speed;
    if (this.x > 400) {
      this.y = 410;
    }
  }
  else if (buttonPress == "up"){
    this.y -= this.speed;
    if (this.y <= (25)){
      winGame();
      return;
    }
  }
  else if (buttonPress = "down") {
    this.y += this.speed;
    if (this.y >410){
      this.y = 410;
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(0, 0, 0);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function restartGame() {
  player.reset();
  allEnemies = [];
  allEnemies.push(
    new Enemy(0, 40 + Math.random()*100,40 + Math.random()*100)
    new Enemy(0, 60 + Math.random()*100,60 + Math.random()*100)
    new Enemy(0, 50 + Math.random()*130,70 + Math.random()*100)
  )
}

function winGame(){
  player.reset();
  score += 1;
  document.getElementById("score").innerHTML = score;
  let probability = parseInt(Math.random()*10);
  if (probability < 5 && allEnemies.length < 5) {
    allEnemies.push(new Enemy(0,40 + Math.random()*100,40 + Math.random()*100));
  }
}

let score = 0;
let deaths = 0;
restartGame();
