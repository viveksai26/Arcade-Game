// Enemies our player must avoid
var Enemy = function(x, y, speed, image) {
    //this is enemy function all the enemy properties are written here!
    this.sprite = image;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function(dt) {
    //This code which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 500) {
        this.x = 0;
    }
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy1 = new Enemy(0, 60, 160, 'images/enemy-bug.png');
var Enemy2 = new Enemy(0, 145, 120, 'images/enemy-bug1.png');
var Enemy3 = new Enemy(0, 225, 80, 'images/enemy-bug2.png');
var Enemy4 = new Enemy(350, 320, 0, 'images/Rock.png');

//All the enemy objects are placed in an array.
var allEnemies = [Enemy1, Enemy2, Enemy3, Enemy4];

//This is our player function which has all the player properties
var Player = function(x, y, image) {
    this.sprite = image;
    this.x = x;
    this.y = y;
};
// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//assigining player position and character
var player = new Player(200, 400, 'images/char-horn-girl.png');
//to reset player position
Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 400;
};

//this code checks if collision has occured if occured it will reset
Enemy.prototype.checkCollission = function(i) {
    if (this.x < player.x + 90 && this.x + 100 > player.x && this.y < player.y + 80 && 70 + this.y > player.y) {
        player.resetPlayer();
    }
};
//this code gets input from keyboard and moves player position
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});

//To move the player
Player.prototype.handleInput = (function(key) {
    //for each allowable key, set speed along x, y-axis
    var X, Y;

    switch (key) {
        case 'left':
            X = -50;
            Y = 0;
            break;
        case 'up':
            X = 0;
            Y = -50;
            break;
        case 'right':
            X = 50;
            Y = 0;
            break;
        case 'down':
            X = 0;
            Y = 50;
            break;
        default:
            X = 0;
            Y = 0;
    }

    this.x += X;
    this.y += Y;

    if (this.x < 0) {
        this.x = 0;

    }

    if (this.x > 400) {
        this.x = 400;

    }

    if (this.y > 400) {
        this.y = 400;

    }
    if (this.y <= 0) {
        alert("game won");

        this.y = 400;
    }

    //check for collision
    for (var i = 0; i < allEnemies.length; i++) {
        allEnemies[i].checkCollission(i);
    }
});