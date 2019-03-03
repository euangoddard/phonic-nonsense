import { Strings, WordType } from './models';
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

const START_ONLY_SOUNDS: Strings = ['j', 'qu', ''];

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
  'v',
  'y',
  'w',
  'th',
  'z',
  'ch',
];

const START_SOUNDS: Strings = [...START_ONLY_SOUNDS, ...SIMPLE_SOUNDS, ...CONSONANTAL_DIGRAPHS];

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

const COMPOUND_ENDINGS: Strings = ['are', 'er', 'ow', 'ew', 'ire', 'ear', 'ure'];

export function buildWord(): string {
  let wordParts: Strings;
  switch (getWordTypeAtRandom()) {
    case WordType.Simple:
      wordParts = [sample(START_SOUNDS)!, sample(MIDDLE_SOUNDS)!, sample(END_SOUNDS)!];
      break;
    case WordType.VowelConsonantE:
      wordParts = [
        sample(START_SOUNDS)!,
        sample(VOWELS)!,
        sample(VOWEL_CONSONANT_E_CONSONANTS)!,
        'e',
      ];
      break;
    case WordType.ComplexEnding:
      wordParts = [sample(START_SOUNDS)!, sample(COMPOUND_ENDINGS)!];
      break;
  }

  return wordParts!.join('');
}

function getWordTypeAtRandom(): WordType {
  let wordType: WordType;
  const randomNumber = Math.random();
  if (randomNumber < 0.1) {
    wordType = WordType.VowelConsonantE;
  } else if (randomNumber < 0.2) {
    wordType = WordType.ComplexEnding;
  } else {
    wordType = WordType.Simple;
  }
  return wordType;
}
