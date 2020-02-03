class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacle = [];
    this.controls = new Controls(this);
    this.controls.setBindingKeys();

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
    this.obstacle.runLogic();

    if ((this.obstacle.positionY %  100 == 0)) {
      this.obstacle.push(new Obstacle(this));
    }
  }
  clearRect() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  paint() {
    this.clearRect();
    this.background.paint(this);
    this.player.paint(this);
    // this.obstacle.paint(this);
  }
  start() {
    this.loop();
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.loop();
    });
    this.runLogic();
    this.paint();
  }
}
