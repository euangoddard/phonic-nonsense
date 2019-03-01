import { buildWord } from './words';

(function() {
  updateWord();

  document.addEventListener('click', updateWord, false);
})();

function updateWord(): void {
  const word = buildWord();
  const element = document.querySelector('h1') as HTMLElement;
  element.textContent = word;
}
