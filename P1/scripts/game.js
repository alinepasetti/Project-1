class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.gameSpeed = 2;

    // game over
    this.gameOverImage = new Image();
    this.gameOverImage.src = '../images/gameover_sceen.png';
    this.gameOverSnd = new Audio('../audio/cat-purr.mp3');

    //new components
    this.background = new Background(this);
    this.scoreBoard = new Scoreboard(this);
    this.player = new Player(this);
    this.obstacle = [];
    this.obstacle2 = [];
    this.controls = new Controls(this);
    this.controls.setBindingKeys();

    this.startPath = 330;
    this.endPath = 615;
    // timespan to create new obstacles
    this.speed = 2000;
    this.timer = 0;
    this.timer2 = 0;

    // timespan to increase speed
    this.timer3 = 0;
    this.changeSpeed = 15000;

    // score and running
    this.score = 7;
    this.isRunning = false;

    //music
    this.music = new Audio('../audio/music.mp3');

    //when Game is created / init
    this.startScreen();
  }

  startScreen() {
    this.music.play();
    let startImg = new Image();
    startImg.src = '../images/Entry_of_game_instruc.png';
    this.context.drawImage(startImg, 0, 0, 900, 700, 0, 0, 900, 700);
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowRight':
          console.log('right');
          this.start();
          break;
        case 'ArrowDown':
          this.context.drawImage(startImg, 0, 0 + 700, 900, 700, 0, 0, 900, 700);
          break;
        case 'ArrowUp':
          this.context.drawImage(startImg, 0, 0, 900, 700, 0, 0, 900, 700);
          break;
      }
    });
  }

  playerControls(key) {
    switch (key) {
      case 'up':
      case 'down':
        this.player.runLogic(key);
        break;
    }
  }
  runLogic(timestamp) {
    if (this.timer3 < timestamp - this.changeSpeed) {
      console.log('15 sec');
      this.timer3 = timestamp;
      this.gameSpeed += 1.5;
      this.player.speed += 1;
    }
    this.checkCollision();
    this.player.runLogic();
    this.background.runLogic();
    if (this.score === 0) {
      this.lose();
    }
  }

  lose() {
    this.isRunning = false;
    this.music.pause();
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
    for (let obstacle of this.obstacle) {
      if (obstacle.status === 1) {
        obstacle.paint();
      }
    }
    for (let obstacle2 of this.obstacle2) {
      if (obstacle2.status === 1) {
        obstacle2.update(timestamp);
      }
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  // reset() {
  //   this.isRunning = true;
  //   this.background = new Background(this);
  //   this.scoreBoard = new Scoreboard(this);
  //   this.player = new Player(this);
  //   this.obstacle = [];
  //   this.obstacle2 = [];
  //   this.clearRect();
  //   this.startScreen();
  // }

  togglePause() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.loop();
    }
    this.music.pause();
  }
  checkCollision() {
    const player = this.player;
    for (let obstacle of this.obstacle) {
      if (typeof obstacle.positionX == 'number') {
        if (
          player.positionX + player.width > obstacle.positionX &&
          player.positionX < obstacle.positionX + obstacle.width &&
          player.positionY + player.height > obstacle.positionY &&
          player.positionY < obstacle.positionY + obstacle.height
        ) {
          this.player.scream.play();
          obstacle.status = 0;
          obstacle.positionY = 0;
          this.score -= 1;
        }
      }
    }
    for (let obstacle2 of this.obstacle2) {
      if (typeof obstacle2.positionX == 'number') {
        if (
          player.positionX + player.width > obstacle2.positionX &&
          player.positionX < obstacle2.positionX + obstacle2.width &&
          player.positionY + player.height > obstacle2.positionY + 50 &&
          player.positionY < obstacle2.positionY + obstacle2.height
        ) {
          this.player.scream.play();
          obstacle2.status = 0;
          obstacle2.positionY = 0;
          this.score -= 1;
        }
      }
    }
  }

  loop(timestamp) {
    this.runLogic(timestamp);
    if (this.isRunning) {
      this.paint(timestamp);
      for (let i = 0; i < this.obstacle.length; i++) {
        this.obstacle[i].runLogic(this);
      }
      if (this.timer < timestamp - this.speed) {
        this.timer = timestamp;
        this.obstacle.push(new Obstacle(this));
      }
      for (let n = 0; n < this.obstacle2.length; n++) {
        this.obstacle2[n].runLogic(this);
      }
      if (this.timer2 < timestamp - this.speed * 2) {
        this.timer2 = timestamp;
        this.obstacle2.push(new Obstacle2(this));
      }
      window.requestAnimationFrame(timestamp => {
        this.loop(timestamp);
      });
    }
  }
}
