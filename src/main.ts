import { buildWordParts } from './words';
import { Shake } from './shake';
import { Strings } from './models';
import { debounce, includes } from 'lodash-es';
import { hideElement, listen, showElement } from './dom';

const RELEVANT_KEYBOARD_EVENTS: Strings = ['Space', 'Enter'];

(function() {
  const triggerElement = document.querySelector('#hint-trigger') as HTMLElement;

  document.addEventListener('click', updateWord, false);
  document.addEventListener('touchstart', event => {
    event.preventDefault();
    if (event.target === triggerElement) {
      return;
    }
    updateWord();
  }, {passive: false});

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


  const hintPhonicsElement = document.querySelector('#hint-phonics') as HTMLElement;
  const wordElement = document.querySelector('h1') as HTMLElement;
  listen(
    triggerElement,
    ['click'],
    event => {
      event.stopPropagation();
    },
    true,
  );
  listen(triggerElement, ['mousedown', 'touchstart'], () => {
    showElement(hintPhonicsElement);
    hideElement(wordElement);
  });
  listen(triggerElement, ['mouseup', 'mouseleave', 'touchend', 'touchcancel', 'touchleave'], () => {
    hideElement(hintPhonicsElement);
    showElement(wordElement);
  });
})();

function updateWord(): void {
  const intro = document.querySelector('p');
  if (intro) {
    intro.parentElement!.removeChild(intro);
  }

  const wordParts = buildWordParts();
  const element = document.querySelector('h1') as HTMLElement;
  showElement(element);
  element.textContent = wordParts.join('');
  updateHint(wordParts);
  const triggerElement = document.querySelector('#hint-trigger') as HTMLElement;
  showElement(triggerElement);
}

function updateHint(wordParts: Strings): void {
  const hintPhonicsElement = document.querySelector('#hint-phonics')!;
  while (hintPhonicsElement.firstChild) {
    hintPhonicsElement.removeChild(hintPhonicsElement.firstChild);
  }
  wordParts.forEach(phonic => {
    const spanElement = document.createElement('span');
    spanElement.classList.add('phonic');
    spanElement.textContent = phonic;
    hintPhonicsElement.appendChild(spanElement);
  });
}

function checkKeyEvent(event: KeyboardEvent): void {
  if (includes(RELEVANT_KEYBOARD_EVENTS, event.code)) {
    updateWord();
  }
}
