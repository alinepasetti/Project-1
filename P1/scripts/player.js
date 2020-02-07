const sheet = new Image();
sheet.src = '../images/cat_sprite.png';

class Player {
  constructor(game) {
    this.game = game;
    this.positionX = 50;
    this.positionY = 350;
    this.width = 85;
    this.height = 50;
    this.speed = 10;

    // image
    this.sheet = sheet;

    this.animSpeed = 80;
    this.timer = 0;
    this.spritePositions = [
      [0, 0],
      [284, 0],
      [568, 0],
      [853, 0],
      [0, 161],
      [284, 161],
      [568, 161],
      [853, 161]
    ];
    this.spritePosition = 0;
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

  update(timestamp) {
    const frameWidth = this.sheet.width / 4;
    const frameHeight = this.sheet.height / 2 - 20;

    if (this.timer < timestamp - this.animSpeed) {
      this.timer = timestamp;
      this.game.context.drawImage(
        this.sheet,
        this.spritePositions[this.spritePosition][0],
        this.spritePositions[this.spritePosition][1],
        frameWidth,
        frameHeight,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
      if (this.spritePosition < this.spritePositions.length - 1) {
        this.spritePosition += 1;
      } else {
        this.spritePosition = 0;
      }
    } else {
      this.game.context.drawImage(
        this.sheet,
        this.spritePositions[this.spritePosition][0],
        this.spritePositions[this.spritePosition][1],
        frameWidth,
        frameHeight,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    }
  }
}
