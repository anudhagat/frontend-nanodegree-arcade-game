
Frogger Game
------------
Download: Go to this website https://github.com/anudhagat/frontend-nanodegree-arcade-game.
On the right hand side in the middle of the page, find and click on the Download Zip button.
This will copy a zipped version onto your local computer. Unzip the files and open the file
index.html in your browser.

Game Board
-----------
When the index.html file is opened on your browser, you see a player that is in a grid of
5 by 6 squares. The player is on the green grass squares (1st row, 3rd square) in the begin position.
There are two rows of green grass which are safe for the player to move around in. The topmost
row in the game board is water and it is also safe ground for the player. The object of this game
is to move the player from the green grass rows to the water row.

Moving the Player
-----------------
Up Arrow Key: Moves the player up the squares.
Down Arrow Key: Moves the player down the squares.
Right Arrow Key: Moves the player to the right.
Left Arrow Key: Moves the player to the left.


Bugs:
---------
Between the grass and the water rows are three rows with bug traffic. If the player lands in the same
space as a bug, the player is sent back to the original start position (row 1, column 3). When the game is
reset in this way, you will see a randomly selected new kind of player. The different kinds of players are:
Boy, Cat Girl, Horn Girl, Pink Girl, and Princess.

Jewels:
-------
Your player can collect jewels along the way by landing in a square with a jewel. A score of your
collected jewels is shown at the bottom of the game board. If the player collected a jewel and then collided
with a bug, the jewel score will be incremented and then the player will be sent back to the original start
position. A new jewel will appear in a randomly selected new location.

Game Reset:
-----------
Once the player reaches the water, the player and jewel positions are reset. You get a randomly selected
new kind of player and a randomly selected jewel position.

Sounds:
-------
I added three sounds to the game. When the player lands in the same square as a bug, a sound is made before the
player is reset to the start position. When the player collects a gem, a chime sound is made. Finally, when the
player is reset after reaching the water squares, a success chime is made.

Bug Fixes:
----------
When the princess player reaches the top, part of her crown gets painted outside the game board. Fixed: by
repositioning the player inside the square.