class Controls {
  constructor(game) {
    this.game = game;
  }
  setBindingKeys() {
    window.addEventListener('keydown', event => {
      let keyPressed;
      switch (event.key) {
        case 'ArrowUp':
          keyPressed = 'up';
          break;
        case 'ArrowDown':
          keyPressed = 'down';
          break;
      }
      if (keyPressed) {
        event.preventDefault();
        this.game.playerControls(keyPressed);
      }
    });
  }
}
