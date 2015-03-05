/**
 * @author Anu Dhagat
 */

/** Constants used for image size and row positions of player and enemy.*/
var IMAGE_SIZE = 101;

var PLAYER_START_COLUMN = 202;
var PLAYER_START_ROW = 405;
var PLAYER_ENEMY_ROW_ONE = 243;
var PLAYER_ENEMY_ROW_TWO = 162;
var PLAYER_ENEMY_ROW_THREE = 81;
var PLAYER_END_ROW = 0;

var FIRST_ROW_BUG = 65;
var SECOND_ROW_BUG = 146;
var THIRD_ROW_BUG = 227;

/** Variables for total jewel score and sprites for gem and player. */
var jewelPoints = 0;
var gemSprites = ['images/GemBlue.png','images/GemOrange.png', 'images/GemGreen.png'];
var playerSprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

/**
 * Creates an instance of object Gem.
 * @constructor
 * @this {Gem}
 */
var Gem = function() {

    this.newPosition();
    this.sprite = gemSprites[Math.floor(Math.random()*gemSprites.length)];

}

/** This function sets the postion of the gem by selecting a random row and column.
 * @this {Gem}
 */
Gem.prototype.newPosition = function() {

    this.sprite = gemSprites[Math.floor(Math.random()*gemSprites.length)];

    /** Select a random number between 0 and 5 and multiply it by row width of 101*/
    this.x = Math.floor(Math.random()*5)*101;

    /** Select a random number between 0 and 3, since there are 3 rows of road/rock and multiply it by row height of 83 */
    this.y = PLAYER_ENEMY_ROW_THREE + Math.floor(Math.random()*3)*81;

}

/** This function draws the gem on the screen, required method for game.
 * @this {Gem}
 */
Gem.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/** This function redraws the gem off the board if the player lands in the same square as the gem.
 * @param {number} dt: A time delta between ticks.
 * @this {Gem}
 */
Gem.prototype.update = function(dt) {

    /** if the player lands on the Gem space */
    if ((this.x == player.x) && (this.y == player.y) ){
        /** Place the gem off the game board, not visible.*/
        this.x = -100;
        this.y = -100;
        /** Increment the jewel score. */
        jewelPoints++;
        /** Show the updated score. */
        $('#jewel').text('Jewel Points: ' + jewelPoints.toString());
    }

}

/**
 * Creates an instance of object Enemy.
 * @constructor
 * @param {number} startX Enemy's start x-coordinate
 * @param {number} startY Enemy's start y-coordinate
 * @this {Enemy}
 */
var Enemy = function(startX, startY) {

    /** Set the start position of the enemy equal to the parameters. */
    this.startX = startX;
    this.startY =startY;

    /** Set the current position of the enemy. */
    this.x = this.startX;
    this.y = this.startY;

    /** Set a random speed between 50 and 200. */
    this.speed = Math.floor((Math.random() * 200) + 50);

    /** The image/sprite for our enemies, this uses helper.js to easily load images. */
    this.sprite = 'images/enemy-bug.png';

}

/** This function updates the enemy's position, required method for game.
 * @param {number} dt A time delta between ticks
 * @this {Enemy}
 */
Enemy.prototype.update = function(dt) {

    /** if you reach the end of canvas, reset the bug's start position and generate another random speed*/
    if (this.x > 500){
        this.x = this.startX;
        this.speed = Math.floor((Math.random() * 200) + 50);
    }
    /** if not at the end of canvas, move it forward in the x direction. Multiply any movement by the dt parameter
    which will ensure the game runs at the same speed for all computers. */
    else
        this.x = this.x + this.speed*dt;

}

/** This function draws the enemy on the screen, required method for game
 * @this {Enemy}
 */
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

/**
 * Creates an instance of object Player.
 * @constructor
 * @this {Player}
 */
var Player = function() {

    this.sprite = playerSprites[Math.floor(Math.random()*playerSprites.length)];

    /** Set the default start position*/
    this.startX = PLAYER_START_COLUMN;
    this.startY = PLAYER_START_ROW;

    /** Set the boolean variable that keeps track of whether the player has reached the water. */
    this.reached = false;

    /** Set the current position of the player and initialize to start positions. */
    this.x = this.startX;
    this.y = this.startY;

}

/** This function updates the player's position, required method for game.
 * @param {number} dt a time delta between ticks
 * @this {Player}
 */
Player.prototype.update = function(dt) {

    /** If player has reached the other side the road, reset to begin position. */
    if (this.reached == true){
        this.render();
        this.restart();
    }

    /** There are two bugs travelling on Row three of the road: enemyBug1 and enemyBug2.
     * Check to see if the player is overlapping with these bugs. If there is a
     * collision, then restart the game.
     */
    if (this.y == PLAYER_ENEMY_ROW_THREE) {
        if((this.x > enemyBug1.x - IMAGE_SIZE) && ( this.x < enemyBug1.x + IMAGE_SIZE)){
                this.restart();
            }
        if((this.x > enemyBug2.x - IMAGE_SIZE) && ( this.x < enemyBug2.x + IMAGE_SIZE)){
                this.restart();
            }
    }

    /** Do similar check with Row 2 */
    if (this.y == PLAYER_ENEMY_ROW_TWO) {
        if((this.x > enemyBug3.x - IMAGE_SIZE) && ( this.x < enemyBug3.x + IMAGE_SIZE)){
                this.restart();
            }
        if((this.x > enemyBug4.x - IMAGE_SIZE) && ( this.x < enemyBug4.x + IMAGE_SIZE)){
                this.restart();
            }
    }

    /** Do similar check with Row 1 */
    if (this.y == PLAYER_ENEMY_ROW_ONE) {
        if((this.x > enemyBug5.x - IMAGE_SIZE) && ( this.x < enemyBug5.x + IMAGE_SIZE)){
                this.restart();
            }
        if((this.x > enemyBug6.x - IMAGE_SIZE) && ( this.x < enemyBug6.x + IMAGE_SIZE)){
                this.restart();
            }
    }

}

/** This function places the player at the begin position and resets the reached boolean variable.
 * Also randomly selects a different player sprite.
 * @this {Player}
 */
Player.prototype.restart = function() {

    this.x=this.startX;
    this.y=this.startY;
    this.sprite = playerSprites[Math.floor(Math.random()*playerSprites.length)];
    this.reached = false;
    gem.newPosition();
}

/** This function draws the player on the screen, required method for game
 * @this {Player}
 */
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

/** This function handles the movement of the player on the game board, given the keyboard input keyCode.
 * @this {Player}
 */
Player.prototype.handleInput = function(keyCode) {

    /** If the player's y coordinate is at the top row, mark the player as having reached the other side.*/
    if (this.y == PLAYER_END_ROW)
        this.reached = true;

    /** If moving left and not at leftmost square, update this.x and redraw.*/
    if( (keyCode == 'left') && (this.x != 0)){
        this.x= this.x -101;
        this.update();
        this.render();
    }
    /** If moving right and not at rightmost square, update this.x and redraw.*/
    if( (keyCode == 'right') && (this.x != 404 )){
        this.x= this.x +101;
        this.update();
        this.render();
    }

    /** If moving up and not at top square, update this.y and redraw.
     * If moving up and you are at the top, set reached value to true.
     */
    if ( (keyCode == 'up') && (this.y != PLAYER_END_ROW) ) {
            this.y= this.y -81;
            this.render();
    }

    /** If moving down and not at bottom square, update this.y and redraw. */
    if( (keyCode == 'down') && (this.y != PLAYER_START_ROW)) {
        this.y= this.y +81;
        this.update();
        this.render();
    }
}

/** Instantiate 6 bugs, 2 in each row with bugs. */
var enemyBug1 = new Enemy(-10, FIRST_ROW_BUG);
var enemyBug2 = new Enemy(-250,FIRST_ROW_BUG);
var enemyBug3 = new Enemy(-130, SECOND_ROW_BUG);
var enemyBug4 = new Enemy(-200, SECOND_ROW_BUG);
var enemyBug5 = new Enemy(-90, THIRD_ROW_BUG);
var enemyBug6 = new Enemy(-300, THIRD_ROW_BUG);

/** Place all enemy objects in an array called allEnemies. */
var allEnemies = [enemyBug1,enemyBug2, enemyBug3, enemyBug4, enemyBug5, enemyBug6];

/** Place the player object in a variable called player. */
var player = new Player();

/** Instantiate the gem. */
var gem = new Gem();

/** This eventListener listens for key presses and sends the keys to your Player.handleInput() method. */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
