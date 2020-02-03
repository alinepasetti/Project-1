let x = 0;

class Background {
  constructor(game) {
    this.game = game;
    this.speed = 5;
    this.image = new Image();
    this.image.src = '../images/background.png';
  }
  runLogic() {
    // if (x < -1 * game.context.canvas.width) {
    //   x = 0;
    // }
    x -= this.speed;
    if (this.image.width) {
      x = x % this.image.width;
    }
  }
  paint(game) {
    game.context.drawImage(this.image, x, 0, this.image.width, game.context.canvas.height);
    game.context.drawImage(
      this.image,
      this.image.width + x,
      0,
      this.image.width,
      game.context.canvas.height
    );
    game.context.drawImage(
      this.image,
      this.image.width * 2 + x,
      0,
      this.image.width,
      game.context.canvas.height
    );
  }
}
