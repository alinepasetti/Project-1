class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
    this.scoreBoard = new Scoreboard(this);
    this.player = new Player(this);
    this.obstacle = [];
    this.controls = new Controls(this);
    this.controls.setBindingKeys();

    this.startPath = 330;
    this.endPath = 615;
    this.speed = 1500;
    this.timer = 0;
    this.score = 5;
    this.isRunning = true;

    this.paint();

    // this.gameLoop();
  }

  playerControls(key) {
    switch (key) {
      case 'up':
      case 'down':
        this.player.runLogic(key);
        break;
    }
  }
  runLogic() {
    this.checkCollision();
    this.player.runLogic();
    this.background.runLogic();
    if (this.score === 0) {
      this.isRunning = false;
    }
  }

  clearRect() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  paint() {
    this.clearRect();
    this.background.paint(this);
    this.scoreBoard.paint();
    this.player.paint(this);
    for (let obstacle of this.obstacle) {
      if (obstacle.status === 1) {
        obstacle.paint(this);
      }
    }
  }
  stop() {
    this.reset();
  }

  start() {
    this.reset();
    this.loop();
  }

  reset() {
    this.isRunning = true;
    this.player = new Player(this);
  }
  
  togglePause() {
    this.isRunning = !this.isRunning;
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
          obstacle.status = 0;
          obstacle.positionY = 0;
          this.score -= 1;
        }
      }
    }
  }

  loop(timestamp) {
    this.runLogic();
    this.paint();
    for (let i = 0; i < this.obstacle.length; i++) {
      this.obstacle[i].runLogic(this);
    }
    if (this.timer < timestamp - this.speed) {
      this.timer = timestamp;
      this.obstacle.push(new Obstacle(this));
    }
    if (this.isRunning === true) {
      window.requestAnimationFrame(timestamp => {
        this.loop(timestamp);
      });
    }
  }
}
