var game = new Phaser.Game(700, 700, Phaser.AUTO, null, {
  preload: preload,
  create: create,
  update: update
});

var trampoline;
var ships;
var newBrick;
var shipInfo;
var scoreText;
var score = 0;
var lives = 3;
var shipsLeft = 24;
var killed = 0;
var shipsLeftText;
var asteroid;
var livesText;
var lifeLostText;
var playing = false;
var startButton;
var space;
var startText;


//Preload images and scaling options
function preload() {
  //Set game to not automatically adjust, and center horizontally/vertically
  game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;

  //Load the images into the game
  game.load.image('trampoline', 'assets/tramp.png');
  game.load.image('ship', 'assets/ship.png');
  game.load.image('asteroid', 'assets/asteroid.png');
  game.load.image('button', 'assets/tramp.png');
  game.load.image('space', 'assets/space.png');
  //Preload in google font so it loads in the preload state
  this.game.add.text(0, 0, "fix", {
    font: "1px Orbitron",
    fill: "#FFFFFF"
  });

}
//Create new assets to work with in the game
function create() {
  //Add background image
  space = game.add.tileSprite(0, 0, 700, 700, 'space');
  //Set physics type, Arcade would suit this type of game
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //Create asteroid from the preload image 'asteroid' and place it at x:350, y:490
  asteroid = game.add.sprite(350, 490, 'asteroid');
  //Positioning the asteroid in the middle of the page
  asteroid.anchor.set(0.5);
  //Give the asteroid physics 'arcade' type
  game.physics.enable(asteroid, Phaser.Physics.ARCADE);
  //Set the asteroid to collide with the walls
  asteroid.body.collideWorldBounds = true;
  //Make the bottom ('down') of the screen have no collision
  game.physics.arcade.checkCollision.down = false;
  //Give the asteroid a bounciness of 1. Thanks Arcade Physics
  asteroid.body.bounce.set(1);
  //Checks to see if it left so we can add to score var later
  asteroid.checkWorldBounds = true;
  /* Sets an event handler if it leaves screen, runs "asteroidLeavesScreen"
  function and passes "this" asteroid through the function*/
  asteroid.events.onOutOfBounds.add(asteroidLeavesScreen, this);

  trampoline = game.add.sprite(350, 640, 'trampoline');
  game.physics.enable(trampoline, Phaser.Physics.ARCADE);
  trampoline.anchor.set(0.5, 0.5)
    //Doesnt let any other sprite pass through the trampoline
  trampoline.body.immovable = true;
  trampoline.visible = false;
  //Adds starting text to the screen at 350,350 - the center of the canvas
  startText = game.add.text(350, 350, 'Click the Trampoline!', {
    font: '20px Orbitron',
    fill: 'limegreen'
  });
  startText.anchor.set(0.5);
  //Shows the text
  startText.visible = true;

  shipsLeftText = game.add.text(280, 5, 'Enemies left: ' + shipsLeft, {
    font: '20px Orbitron',
    fill: 'limegreen'
  });
  shipsLeftText.visible = false;
  scoreText = game.add.text(5, 5, 'Score: 0', {
    font: '20px Orbitron',
    fill: 'limegreen'
  });
  scoreText.visible = false;

  livesText = game.add.text(game.world.width - 5, 5, 'Lives: ' + lives, {
    font: '20px Orbitron',
    fill: 'limegreen'
  });
  livesText.anchor.set(1, 0);
  livesText.visible = false;

  lifeLostText = game.add.text(350, 350, 'Life lost! Click anywhere to start again.', {
    font: '20px Orbitron',
    fill: 'limegreen'
  });
  lifeLostText.anchor.set(0.5);
  lifeLostText.visible = false;

  /*Add start button for game to start at position 350,640. Use 'button' from Preload
  and assign 'this' button.*/
  startButton = game.add.button(350, 640, 'button', startGame, this);
  startButton.anchor.set(0.5);
  //Running create ships function to make the alien ships
  createShips();
}
//Sets what to update on every frame
function update() {
  //Makes the background image move vertically at a speed of 2
  space.tilePosition.y += 2;
  //Gives asteroid and trampoline collision then runs the asteroidBounce function
  game.physics.arcade.collide(asteroid, trampoline, asteroidBounce);
  //Same thing with the asteroid and ships, then the asteroidShip function
  game.physics.arcade.collide(asteroid, ships, asteroidShip);
  /*If the game is 'playing', run the 'move to pointer' function. Set the trampoline to
  follow, will move at a speed of 60px/s, follow the mouse, and gives it 150ms to get to the mouse*/
  if (playing) {
    game.physics.arcade.moveToPointer(trampoline, 60, game.input.activePointer, 150);
  }
}

function createShips() {
  //Add ships to a 'container group' for sprites and images
  ships = game.add.group();
  //for loop for 3 rows
  for (i = 0; i < 3; i++) {
    //for loop for 8 columns
    for (j = 0; j < 8; j++) {
      /*X variable for width of ship. On each index number * width of object(70px) and padding of 13px around and offset of 60px*/
      var shipX = (j * (70 + 13)) + 60;
      //Same thing with height of 30px and an offset of 50px
      var shipY = (i * (30 + 13)) + 50;
      var newAlien = game.add.sprite(shipX, shipY, 'ship');
      game.physics.enable(newAlien, Phaser.Physics.ARCADE);
      newAlien.body.immovable = true;
      newAlien.anchor.set(0.5);
      //Assigns the new ships to the 'ships' variable
      ships.add(newAlien);
    }
  }
}
function asteroidShip(asteroid, ship) {
  shipsLeft -= 1;
  score += 100;
  $('#scoreVal').text(score);
  killed += 1;
  $('#numKilled').text(shipsLeft);
  //If the user kills all the ships
  if (shipsLeft === 0) {
    asteroid.destroy();
    trampoline.destroy();
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("miliseconds", mili);
    localStorage.setItem("score", score);
    var localSeconds = localStorage.getItem("seconds");
    var localMili = localStorage.getItem("miliseconds");
    var highSeconds = localStorage.getItem("highseconds");
    var highMili = localStorage.getItem("highmili");
    var modalTitleWin = 'Yay! You beat the game! Not too hard was it...';
    var modalTime = 'Your time was <span class="red-text">'+localSeconds+'</span> seconds and <span class="red-text">'+localMili+'</span> miliseconds!';
    var youGotIt = 'You have the new high score!! WOOOOOOOO!!!';
    var modalHighLost = 'Can you beat the game and the fastest time of:\n <span class="red-text">'+highSeconds+'</span> seconds \n and \n <span class="red-text">'+highMili+'</span> miliseconds?';
    var modalHighWin = 'Nice job! You beat the best time and got a new high score! \n The new high score is: <span class="red-text">'+localSeconds+'</span> seconds and <span class="red-text">'+localMili+'</span> miliseconds!';

    if (highSeconds == null){
      $('#modalButton').click();
      // $('#modalButton').show();
      localStorage.setItem('highseconds', seconds);
      highSeconds = localStorage.getItem("highseconds");
      localStorage.setItem('highmili', mili);
      highMili = localStorage.getItem("highmili");
      document.getElementById("modalTitle").innerHTML = modalTitleWin;
      document.getElementById("yourTime").innerHTML = modalTime;
      document.getElementById("highScoreTime").innerHTML = youGotIt;
    }
    if (localSeconds > highSeconds) {
      // $('#modalButton').show();
      $('#modalButton').click();
      document.getElementById("modalTitle").innerHTML = modalTitleWin;
      document.getElementById("yourTime").innerHTML = modalTime;
      document.getElementById("highScoreTime").innerHTML = modalHighLost;
    }
    if (localSeconds < highSeconds) {
      $('#modalButton').click();
      // $('#modalButton').show();
      document.getElementById("modalTitle").innerHTML = modalTitleWin;
      document.getElementById("yourTime").innerHTML = modalTime;
      document.getElementById("highScoreTime").innerHTML = modalHighWin;
    }
    resetGame();
  }
  //Create a 'tween' for the ship kill animation
  var killTween = game.add.tween(ship.scale);
  //Have it shrink to the center
  killTween.to({
    x: 0,
    y: 0
    //In 120ms
  }, 120, Phaser.Easing.Linear.None);
  //Once done, run a function that 'kills' or removes the ship
  killTween.onComplete.addOnce(function() {
    ship.kill();
  }, this);
  //Runs the animation
  killTween.start();
}

function asteroidLeavesScreen() {
  lives--;
  $('#livesLeft').text(lives);
  if (lives > 0) {
    lifeLostText.visible = true;
    //Resets the asteroid at x:350, y:490
    asteroid.reset(350, 490);
    trampoline.reset(350, 655);
    //Stop playing
    playing = false;
    //On click, run the function
    game.input.onDown.addOnce(function() {
      //Hide the text
      lifeLostText.visible = false;
      //Start playing again
      playing = true;
    }, this);
    //If you died
  } if (lives == 0) {
    // asteroid.destroy();
    // trampoline.destroy();
    localStorage.setItem("score", score);
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("miliseconds", mili);
    var lastScore = localStorage.getItem("score");
    var localSeconds = localStorage.getItem("seconds");
    var localMili = localStorage.getItem("miliseconds");
    var modalScore = 'Game over. Your score was <span class="red-text">'+lastScore+'</span>!';
    var modalTime = 'Your time was <span class="red-text">'+localSeconds+'</span> seconds and <span class="red-text">'+localMili+'</span> miliseconds!';
    var modalTitleLost = 'Sorry! You lost the game!';
    var canYou = 'Can you beat the game and get a new lowest completion time?';
    $('#modalButton').click();
    // $('#modalButton').show();
    document.getElementById("modalTitle").innerHTML = modalTitleLost;
    document.getElementById("youLost").innerHTML = modalScore;
    document.getElementById("yourTime").innerHTML = modalTime;
    document.getElementById("canyou").innerHTML = canYou;
    resetGame();
  }
}
function didntWin (){
  localStorage.setItem("score", score);
  localStorage.setItem("seconds", seconds);
  localStorage.setItem("miliseconds", mili);
  var modalScore = 'Game over. Your score was <span class="red-text">'+lastScore+'</span>!';
  var modalTime = 'Your time was <span class="red-text">'+localSeconds+'</span> seconds and <span class="red-text">'+localMili+'</span> miliseconds!';
  var modalTitleLost = 'Sorry! You lost the game!';
  document.getElementById("modalTitle").innerHTML = modalTitleLost;
  document.getElementById("youLost").innerHTML = modalScore;
  document.getElementById("yourTime").innerHTML = modalTime;
  $('#modalButton').click();
  // $('#modalButton').show();
}
function asteroidBounce(asteroid, trampoline) {
  //Velocity for bouncing off platform
  asteroid.body.velocity.x = -1 * 5 * (trampoline.x - asteroid.x);
}
function resetGame (){
  seconds = 0;
  mili = 0;
  score = 0;
  lives = 3;
  shipsLeft = 24;
  $('#scoreVal').text(score);
  $('#numKilled').text(shipsLeft);
  $('#livesLeft').text(lives);
  secondsElement.innerText = ''+seconds+'s';
  miliElement.innerText = ''+mili+'ms';
  start();
  game.state.start(game.state.current);
}
function startGame() {
  //Remove the start button
  startButton.destroy();
  //Remove starting text
  startText.alpha = 0;
  //Start playing
  trampoline.visible = true;
  $('#start').click();
  playing = true;
}
