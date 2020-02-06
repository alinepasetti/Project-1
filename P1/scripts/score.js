class Scoreboard {
  constructor(game) {
    this.game = game;
    this.$scoreSpan = document.querySelector('aside h1 span');
  }
  paint() {
    const score = this.game.score;
    this.$scoreSpan.innerText = score;
  }
}
