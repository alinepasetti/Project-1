class Player {
  constructor(game) {
    this.game = game;
    this.positionX = 50;
    this.positionY = 350;
    this.height = 50;
    this.speed = 10;
  }

  paint(game) {
    const context = this.game.context;
    context.save();
    game.context.fillStyle = 'pink';
    game.context.fillRect(this.positionX, this.positionY, 300, this.height);
    context.restore();
  }
  runLogic(key) {
    switch (key) {
      case 'up':
        if (this.positionY > 0) {
          console.log('up');
          this.positionY -= this.speed;
          console.log(this.positionY);
        }
        break;
      case 'down':
        if (this.positionY + this.height < this.game.context.canvas.height) {
          console.log('down');
          this.positionY += this.speed;
        }
        break;
    }
  }
}
