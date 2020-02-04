const $canvas = document.querySelector('canvas');
const game = new Game($canvas);

document.querySelector('#btn-start').addEventListener('click', () => {
  game.start();
});

document.getElementById('btn-reset').addEventListener('click', () => {
  game.reset();
});

document.getElementById('btn-stop').addEventListener('click', () => {
  game.togglePause();
});

// window.addEventListener('load', () => {
//   game.start();
// });
