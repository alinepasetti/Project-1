class Obstacle2 {
  constructor(game) {
    this.game = game;
    this.height = 112;
    this.width = 122.5;
    this.positionX = this.game.context.canvas.width; //this.game.context.canvas.width - this.width;
    this.positionY = 0;

    this.image = new Image();
    this.image.src = '../images/bike_sprite.png';
    this.spritePositions = [
      [0, 0],
      [122.5, 0]
    ];

    this.frameWidth = this.image.width / 2;
    this.frameHeight = this.image.height;
    this.animSpeed = 280;
    this.timer = 0;
    this.spritePosition = 0;

    this.speed = 2 * game.gameSpeed;
    this.status = 1;
    this.setRandom();
  }

  update(timestamp) {
    if (this.timer < timestamp - this.animSpeed) {
      this.timer = timestamp;
      this.game.context.drawImage(
        this.image,
        this.spritePositions[this.spritePosition][0],
        this.spritePositions[this.spritePosition][1],
        this.frameWidth,
        this.frameHeight,
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
        this.image,
        this.spritePositions[this.spritePosition][0],
        this.spritePositions[this.spritePosition][1],
        this.frameWidth,
        this.frameHeight,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    }
  }

  paint() {
    const context = this.game.context;
    context.drawImage(this.image, this.positionX, this.positionY, 150, 50);
  }
  setRandom() {
    this.positionY =
      this.game.startPath + Math.random() * (this.game.endPath - this.game.startPath - this.height);
  }
  runLogic() {
    this.positionX -= this.speed;
  }
}
