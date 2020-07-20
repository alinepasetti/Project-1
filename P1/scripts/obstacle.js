const image = new Image();
image.src = './images/cucumber.png';

class Obstacle {
  constructor(game) {
    this.game = game;
    this.height = image.height;
    this.width = image.width;
    this.positionX = 900;
    this.positionY = 500;
    this.speed = this.game.gameSpeed;
    this.status = 1;
    this.setRandom();
  }
  paint() {
    const context = this.game.context;
    context.drawImage(image, this.positionX, this.positionY);
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
