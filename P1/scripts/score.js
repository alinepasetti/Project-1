class Scoreboard {
  constructor(game) {
    this.game = game;
    this.$scoreSpan = document.querySelector('#score span');
  }
  paint() {
    let score = this.game.score;
    if (score <= 0) score = 0;
    this.$scoreSpan.innerText = score;
  }
}
