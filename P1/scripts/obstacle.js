class Obstacle {
  constructor(game) {
    this.game = game;
    this.height = 50;
    this.width = 50;
    this.positionX = 500; //this.game.context.canvas.width - this.width;
    this.positionY = 0;
    this.speed = 5;
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
    this.positionY = Math.random() * this.game.context.canvas.width - this.height;
  }
  runLogic() {
    this.positionX -= this.speed;
  }
}
