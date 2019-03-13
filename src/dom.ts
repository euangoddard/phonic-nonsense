import { Strings } from './models';

export function showElement(element: HTMLElement): void {
  element.classList.remove('hidden');
}

export function hideElement(element: HTMLElement): void {
  element.classList.add('hidden');
}

export function listen(
  element: HTMLElement,
  eventNames: Strings,
  callback: EventListenerOrEventListenerObject,
  useCapture = false,
): void {
  eventNames.forEach(eventName => {
    element.addEventListener(eventName, callback, useCapture);
  })
}
