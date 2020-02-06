const $canvas = document.querySelector('canvas');
const game = new Game($canvas);

document.getElementById('btn-reset').disabled = true;
document.getElementById('btn-stop').disabled = true;

window.addEventListener('load', () => {
  game.startScreen();

  document.querySelector('#btn-start').addEventListener('click', () => {
    game.start();
  });
  // document.addEventListener('keydown', event => {
  //   switch (event.key) {
  //     case 'ArrowRight':
  //       console.log('right');
  //       game.start();
  //       break;
  //     case 'arrowDown':
  //       console.log('down');
  //       this.context.drawImage(startImg, 0, 0 + 700, 900, 700, 0, 0, 900, 700);
  //   }
  // });
});
console.dir(document.getElementById('btn-start'));

document.getElementById('btn-reset').addEventListener('click', () => {
  game.reset();
});

document.getElementById('btn-stop').addEventListener('click', () => {
  game.togglePause();
});

game.player.update();