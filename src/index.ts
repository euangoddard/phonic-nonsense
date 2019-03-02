import { buildWord } from './words';
import { Shake } from './shake';

(function() {
  updateWord();

  document.addEventListener('click', updateWord, false);

  const shaker = new Shake();
  shaker.start();

  window.addEventListener('shake', updateWord, false);
})();

function updateWord(): void {
  const word = buildWord();
  const element = document.querySelector('h1') as HTMLElement;
  element.textContent = word;
}
