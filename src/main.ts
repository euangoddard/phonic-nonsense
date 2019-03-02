import { buildWord } from './words';
import { Shake } from './shake';
import { Strings } from './models';
import { debounce } from 'lodash-es';

const RELEVANT_KEYBOARD_EVENTS: Strings = ['Space', 'Enter'];

(function() {
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
  const intro = document.querySelector('p');
  if (intro) {
    intro.parentElement!.removeChild(intro);
  }

  const word = buildWord();
  const element = document.querySelector('h1') as HTMLElement;
  element.style.display = 'block';
  element.textContent = word;
}

function checkKeyEvent(event: KeyboardEvent): void {
  if (RELEVANT_KEYBOARD_EVENTS.includes(event.code)) {
    updateWord();
  }
}
