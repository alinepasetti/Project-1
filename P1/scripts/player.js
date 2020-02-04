const img1 = new Image();
const img2 = new Image();
img1.src = '../images/cat_sprite_1.png';
img1.src = '../images/cat_sprite_2.png';

class Player {
  constructor(game) {
    this.game = game;
    this.positionX = 50;
    this.positionY = 350;
    this.width = 70;
    this.height = 50;
    this.speed = 10;
    this.img = [img1, img2];
  }
  paint(game) {
    for (let img of this.img) {
      game.context.drawImage(img, this.positionX, this.positionY, this.width, this.height);
    }
  }
  runLogic(key) {
    switch (key) {
      case 'up':
        if (this.positionY > this.game.startPath) {
          this.positionY -= this.speed;
        }
        break;
      case 'down':
        if (this.positionY + this.height < this.game.endPath) {
          this.positionY += this.speed;
        }
        break;
    }
  }
}
