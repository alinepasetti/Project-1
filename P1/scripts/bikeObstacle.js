const imageBike = new Image();
imageBike.src = './images/bike_sprite.png';

class Bikes extends Obstacle {
  constructor(game) {
    super(game);
    this.game = game;
    this.height = 112;
    this.width = 122.5;
    this.positionX = 900; //this.game.context.canvas.width - this.width;
    this.positionY;
    this.speed = 2 * this.game.gameSpeed;
    this.frameWidth = imageBike.width / 2;
    this.frameHeight = imageBike.height;
    this.status = 1;

    // variables related to the bike sprites
    this.spritePositions = [
      [0, 0],
      [122.5, 0],
    ];
    this.spriteAnimationSpeed = 280;
    this.bikeSpritesTimer = 0;
    this.spritePosition = 0;

    this.setRandom();
  }

  paint(timestamp) {
    if (this.bikeSpritesTimer < timestamp - this.spriteAnimationSpeed) {
      this.bikeSpritesTimer = timestamp;
      this.spritePosition = this.spritePosition === 0 ? 1 : 0;
      this.game.context.drawImage(
        imageBike,
        this.spritePositions[this.spritePosition][0],
        this.spritePositions[this.spritePosition][1],
        this.frameWidth,
        this.frameHeight,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    } else {
      this.game.context.drawImage(
        imageBike,
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

  runLogic() {
    this.positionX -= this.speed;
  }

  takeOutRandomLives() {
    return Math.floor(Math.random() * 3 + 1);
  }
}
