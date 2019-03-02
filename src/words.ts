import { Strings } from './models';
import { sample } from 'lodash-es';

const START_SOUNDS: Strings = [
  'm',
  's',
  'd',
  't',
  'n',
  'p',
  'g',
  'c',
  'k',
  'b',
  'f',
  'l',
  'h',
  'sh',
  'r',
  'j',
  'v',
  'y',
  'w',
  'th',
  'z',
  'ch',
  'qu',
  '', // Some words can start with vowel sounds
];

const MIDDLE_SOUNDS: Strings = [
  'a',
  'i',
  'o',
  'u',
  'e',
  'ee',
  'igh',
  'oo',
  'ar',
  'or',
  'air',
  'ir',
  'ou',
  'oy',
  'ea',
  'oi',
  'aw',
  'ur',
  'ow',
  'ai',
  'oa',
  'ew',
];

const END_SOUNDS: Strings = [...START_SOUNDS, 'ss', 'll', 'ck', 'ng', 'nk', 'x'];

export function buildWord(): string {
  return [sample(START_SOUNDS), sample(MIDDLE_SOUNDS), sample(END_SOUNDS)].join('');
}
