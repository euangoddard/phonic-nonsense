import { Strings } from './models';
import { sample } from 'lodash-es';

const VOWELS: Strings = ['a', 'e', 'i', 'o', 'u'];

const CONSONANTAL_DIGRAPHS: Strings = [
  'bl',
  'br',
  'cl',
  'cr',
  'dr',
  'fl',
  'fr',
  'gl',
  'gr',
  'pl',
  'pr',
  'sl',
  'sm',
  'sn',
  'sp',
  'st',
  'sw',
  'tr',
  'tw',
];

const SIMPLE_SOUNDS: Strings = [
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
];

const START_SOUNDS: Strings = [
  ...SIMPLE_SOUNDS,
  ...CONSONANTAL_DIGRAPHS,
  '', // Some words can start with vowel sounds
];

const MIDDLE_SOUNDS: Strings = [
  ...VOWELS,
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

const END_SOUNDS: Strings = [...SIMPLE_SOUNDS, 'ss', 'll', 'ck', 'ng', 'nk', 'x'];

const VOWEL_CONSONANT_E_CONSONANTS: Strings = ['d', 'k', 'f', 'l', 'm', 'n', 'p', 't', 'v'];

export function buildWord(): string {
  let wordParts: Strings;
  if (Math.random() < 0.1) {
    // only do vowel-consonant-e combo 1/10th of the time
    wordParts = [
      sample(START_SOUNDS)!,
      sample(VOWELS)!,
      sample(VOWEL_CONSONANT_E_CONSONANTS)!,
      'e',
    ];
  } else {
    wordParts = [sample(START_SOUNDS)!, sample(MIDDLE_SOUNDS)!, sample(END_SOUNDS)!];
  }

  return wordParts.join('');
}
