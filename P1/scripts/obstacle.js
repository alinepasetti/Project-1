class Obstacle {
  constructor(game) {
    this.game = game;
    this.image = new Image();
    this.image.src = '../images/cucumber.png';
    this.height = this.image.height;
    this.width = this.image.width;
    this.positionX = this.game.context.canvas.width;
    this.positionY = 0;
    this.speed = this.game.gameSpeed;
    this.status = 1;
    this.setRandom();
  }
  paint() {
    const context = this.game.context;
    context.drawImage(this.image, this.positionX, this.positionY);
  }
  setRandom() {
    this.positionY =
      this.game.startPath + Math.random() * (this.game.endPath - this.game.startPath - this.height);
  }
  runLogic() {
    this.speed = this.game.gameSpeed;
    this.positionX -= this.speed;
  }
}
