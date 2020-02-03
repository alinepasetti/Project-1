class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacle = [new Obstacle(this)];
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

    for (let i = 0; i < this.obstacle.length; i++) {
      this.obstacle[i].runLogic(this);
      if (this.obstacle[i].positionX === 580) {
        this.obstacle.push(new Obstacle(this));
        // this.obstacle[i].paint();
      }
      console.log(this.obstacle);
    }
    // for (let o of this.obstacle) {
    //   console.log('he');
    //   o.positionX -= o.speed;
    //     o.paint();
    //   }
    // }
  }

  clearRect() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  paint() {
    this.clearRect();
    this.background.paint(this);
    this.player.paint(this);
    this.obstacle[0].paint(this);
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
