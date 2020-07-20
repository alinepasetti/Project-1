//music
const music = new Audio('./audio/music.mp3');
const bikeSound = new Audio('./audio/bike-bell.mp3');
const catScreaming = new Audio('./audio/cat-screaming.mp3');

class Game {
  constructor($canvas) {
    // general canvas ang game information
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.isRunning = false;

    // game end auxiliary variables
    // game will end after 60 second running
    this.gameEnd = 60000;
    this.timerToEndGame = 0;

    // game started auxiliary variables
    this.gameStarted = false;
    // will be set to the timestamp at the moment the game (re)starts
    this.gameStartedTime = 0;

    // game screens
    this.gameEndImg = new Image();
    this.gameEndImg.src = './images/endGameBG.png';
    this.startImg = new Image();
    this.startImg.src = './images/Entry_of_game_instruc.png';
    this.gameOverImage = new Image();
    this.gameOverImage.src = './images/gameover_sceen.png';

    // game sounds
    this.gameOverSnd = new Audio('./audio/cat-purr.mp3');

    // new components being instantiated
    this.background = new Background(this);
    this.scoreBoard = new Scoreboard(this);
    this.player = new Player(this);
    this.cucumbersArray = [];
    this.bikesArray = [];
    this.controls = new Controls(this);
    this.controls.setBindingKeys();

    // path available for the player to walk through - max and min in the y axis
    this.startPath = 330;
    this.endPath = 615;

    // timespan to create new obstacles -> cucumbers
    this.speed = 2000;
    this.timerCucumberCreation = 0;

    // timespan to create new obstacles -> bikes
    this.timerBikesCreation = 0;

    // game speed that will change within time and influence on the obstacle creation
    this.gameSpeed = 2;
    this.timerToIncreaseSpeed = 0;
    this.changeSpeed = 15000;

    // score auxiliary variables
    this.score = 7;

    //when Game is created / init
    this.startScreenMenu = true;
  }

  // Method to draw menu screen and key bindings to start game / see instructions
  startScreen() {
    this.context.drawImage(this.startImg, 0, 0, 900, 700, 0, 0, 900, 700);
    document.addEventListener('keydown', (event) => {
      if (!this.isRunning && this.startScreenMenu) {
        switch (event.key) {
          case 'ArrowRight':
            this.start();
            break;
          case 'ArrowDown':
            this.context.drawImage(this.startImg, 0, 0 + 700, 900, 700, 0, 0, 900, 700);
            break;
          case 'ArrowUp':
            this.context.drawImage(this.startImg, 0, 0, 900, 700, 0, 0, 900, 700);
            break;
        }
      }
    });
  }

  // gameplay key bindings
  playerControls(key) {
    switch (key) {
      case 'up':
      case 'down':
        // calls method set in the player class and sends the key that was pressed
        this.player.runLogic(key);
        break;
    }
  }

  runLogic(timestamp) {
    this.checkCollision(this.bikesArray);
    this.checkCollision(this.cucumbersArray);
    this.player.runLogic();
    this.background.runLogic();

    // iterating the cucumbers arrau and running the run logic
    for (let cucumber of this.cucumbersArray) {
      cucumber.runLogic();
    }

    // iterating the bike array and running the logic for them to move
    for (let bike of this.bikesArray) {
      bike.runLogic();
    }

    // creating bikes as obstacles
    if (this.timerBikesCreation < timestamp - this.speed * 2) {
      this.timerBikesCreation = timestamp;
      bikeSound.play();
      this.bikesArray.push(new Bikes(this));
    }

    if (this.timerToIncreaseSpeed < timestamp - this.changeSpeed - this.gameStartedTime) {
      this.timerToIncreaseSpeed = timestamp;
      this.gameSpeed += 1.5;
      this.player.speed += 1;
      this.speed -= 400;
    }
    if (this.timerToEndGame < timestamp - this.gameEnd - this.gameStartedTime) {
      this.isRunning = false;
      music.pause();
      this.gameOverSnd.play();
      this.scoreBoard.paint();
      this.context.drawImage(this.gameEndImg, 0, 0, 900, 700);
    }
    if (this.score <= 0) {
      this.lose();
    }
  }

  lose() {
    this.isRunning = false;
    music.pause();
    this.gameOverSnd.play();
    this.scoreBoard.paint();
    this.context.drawImage(this.gameOverImage, 0, 0, 900, 700);
  }

  clearRect() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  paint(timestamp) {
    this.clearRect();
    this.background.paint(this);
    this.scoreBoard.paint();
    this.player.update(timestamp);
    for (let obstacle of this.cucumbersArray) {
      if (obstacle.status === 1) {
        obstacle.paint();
      }
    }
    for (let bikesArray of this.bikesArray) {
      if (bikesArray.status === 1) {
        bikesArray.paint(timestamp);
      }
    }
  }

  start() {
    if (!this.isRunning) {
      this.gameStarted = true;
      music.play();
      this.isRunning = true;
      this.loop(0);
      this.startScreenMenu = false;
    }
  }

  reset() {
    music.play();
    this.cucumbersArray = [];
    this.bikesArray = [];
    this.timerCucumberCreation = 0;
    this.timerBikesCreation = 0;
    this.timerToIncreaseSpeed = 0;
    this.timerToEndGame = 0;
    this.score = 7;
    this.background = new Background(this);
    this.scoreBoard = new Scoreboard(this);
    this.player = new Player(this);
    this.gameSpeed = 2;
    this.background.speed = this.gameSpeed;
    this.player.speed = 10;
    this.start();
    // if (!this.isRunning) {
    //   this.isRunning = true;
    // }
  }

  togglePause() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      music.play();
      this.loop(0);
    } else {
      music.pause();
    }
  }

  checkCollision(array) {
    const player = this.player;
    for (let obstacle of array) {
      if (typeof obstacle.positionX == 'number') {
        if (
          player.positionX + player.width > obstacle.positionX &&
          player.positionX < obstacle.positionX + obstacle.width &&
          player.positionY + player.height > obstacle.positionY &&
          player.positionY < obstacle.positionY + obstacle.height
        ) {
          catScreaming.play();
          obstacle.status = 0;
          // this.cucumbersArray.splice(obstacle.indexOf(obstacle), 1);
          obstacle.positionY = 0;
          const removeLives = array === this.cucumbersArray ? 1 : obstacle.takeOutRandomLives();
          this.score -= removeLives;
        }
      }
    }
  }

  loop(timestamp) {
    if (this.gameStarted && timestamp) {
      this.gameStarted = false;
      this.gameStartedTime = timestamp;
    }

    this.runLogic(timestamp);
    if (this.isRunning) {
      this.paint(timestamp);

      if (this.timerCucumberCreation < timestamp - this.speed) {
        this.timerCucumberCreation = timestamp;
        this.cucumbersArray.push(new Obstacle(this));
      }
      window.requestAnimationFrame((timestamp) => {
        this.loop(timestamp);
      });
    } else {
    }
  }
}
