import { buildWord } from './words';
import { Shake } from './shake';
import { Strings } from './models';
import { debounce } from 'lodash-es';

const RELEVANT_KEYBOARD_EVENTS: Strings = ['Space', 'Enter'];

(function() {
  updateWord();

  document.addEventListener('click', updateWord, false);

  const shaker = new Shake();
  shaker.start();

  window.addEventListener('shake', updateWord, false);
  window.addEventListener(
    'keypress',
    debounce(checkKeyEvent, 100, {
      leading: true,
      trailing: false,
    }),
    false,
  );
})();

function updateWord(): void {
  const word = buildWord();
  const element = document.querySelector('h1') as HTMLElement;
  element.textContent = word;
}

function checkKeyEvent(event: KeyboardEvent): void {
  if (RELEVANT_KEYBOARD_EVENTS.includes(event.code)) {
    updateWord();
  }
}
