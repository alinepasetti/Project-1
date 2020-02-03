class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacle = [new Obstacle(this)];
    this.controls = new Controls(this);
    this.controls.setBindingKeys();

    this.startPath = 330;
    this.endPath = 615;
    this.speed = 1500;
    this.timer = 0;

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
    this.player.runLogic();
    this.background.runLogic();
  }

  clearRect() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  paint() {
    this.clearRect();
    this.background.paint(this);
    this.player.paint(this);
    for (let obstacle of this.obstacle) {
      obstacle.paint(this);
    }
  }

  start() {
    this.loop();
  }

  loop(timestamp) {
    window.requestAnimationFrame(timestamp => {
      this.loop(timestamp);
    });
    for (let i = 0; i < this.obstacle.length; i++) {
      this.obstacle[i].runLogic(this);
    }
    console.log(timestamp);
    if (this.timer < timestamp - this.speed) {
      this.timer = timestamp;
      this.obstacle.push(new Obstacle(this));
    }
    this.runLogic();
    this.paint();
  }
}
