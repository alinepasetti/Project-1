const $canvas = document.querySelector('canvas');
const game = new Game($canvas);

window.addEventListener('load', () => {
  game.startScreen();

  document.querySelector('#btn-start').addEventListener('click', () => {
    game.start();
  });
});

document.getElementById('btn-reset').addEventListener('click', () => {
  game.reset();
});

document.getElementById('btn-stop').addEventListener('click', () => {
  game.togglePause();
});
