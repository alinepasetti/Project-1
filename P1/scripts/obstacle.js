class Obstacle {
  constructor(game) {
    this.game = game;
    this.height = 50;
    this.width = 50;
    this.positionX = this.game.context.canvas.width; //this.game.context.canvas.width - this.width;
    this.positionY = 0;
    this.image = new Image();
    this.image.src = '../images/cucumber.svg';
    this.speed = game.gameSpeed;
    this.status = 1;
    this.setRandom();
  }
  paint() {
    const context = this.game.context;
    context.drawImage(this.image, this.positionX, this.positionY, this.width, this.height);
  }
  setRandom() {
    this.positionY =
      this.game.startPath + Math.random() * (this.game.endPath - this.game.startPath - this.height);
  }
  runLogic() {
    this.positionX -= this.speed;
  }
}
