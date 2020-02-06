let x = 0;

class Background {
  constructor(game) {
    this.game = game;
    this.speed = this.game.gameSpeed; //this.game.gameSpeed;
    this.image = new Image();
    this.image.src = '../images/background.png';
  }
  runLogic() {
    this.speed = this.game.gameSpeed;
    console.log('this is the background speed', this.speed);
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
