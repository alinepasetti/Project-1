class Obstacle {
  constructor(game) {
    this.game = game;
    this.height = 50;
    this.width = 50;
    this.positionX = this.game.context.canvas.width; //this.game.context.canvas.width - this.width;
    this.positionY = 0;
    this.speed = 3;
    this.setRandom();
  }
  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'red';
    context.fillRect(this.positionX, this.positionY, this.width, this.height);
    context.restore();
  }
  setRandom() {
    this.positionY =
      this.game.startPath + Math.random() * (this.game.endPath - this.game.startPath - this.height);
  }
  runLogic() {
    this.positionX -= this.speed;
  }
}
