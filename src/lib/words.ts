import { Difficulties } from "../models/difficulties";
import { Strings } from "../models/strings";
import { WordType } from "../models/word-types";
import { choice } from "./random";

const VOWELS: Strings = ["a", "e", "i", "o", "u"];

const CONSONANTAL_DIGRAPHS: Strings = [
  "bl",
  "br",
  "cl",
  "cr",
  "dr",
  "fl",
  "fr",
  "gl",
  "gr",
  "pl",
  "pr",
  "sl",
  "sm",
  "sn",
  "sp",
  "st",
  "sw",
  "tr",
  "tw",
];

const START_ONLY_SOUNDS: Strings = ["j", "qu", ""];

const SIMPLE_SOUNDS: Strings = [
  "m",
  "s",
  "d",
  "t",
  "n",
  "p",
  "g",
  "c",
  "k",
  "b",
  "f",
  "l",
  "h",
  "sh",
  "r",
  "v",
  "y",
  "w",
  "th",
  "z",
  "ch",
];

const START_SOUNDS: Strings = [
  ...START_ONLY_SOUNDS,
  ...SIMPLE_SOUNDS,
  ...CONSONANTAL_DIGRAPHS,
];

const SET_1_MIDDLE_SOUNDS: Strings = [...VOWELS];

const SET_2_MIDDLE_SOUNDS: Strings = [
  ...SET_1_MIDDLE_SOUNDS,
  "ay",
  "ee",
  "igh",
  "oo",
  "ar",
  "or",
  "air",
  "ir",
  "ou",
  "oy",
  "ow",
];

const SET_3_MIDDLE_SOUNDS: Strings = [
  ...SET_2_MIDDLE_SOUNDS,
  "ea",
  "oi",
  "aw",
  "ur",
  "ai",
  "oa",
  "ew",
];

const END_SOUNDS: Strings = [
  ...SIMPLE_SOUNDS,
  "ss",
  "ll",
  "ck",
  "ng",
  "nk",
  "x",
];

const VOWEL_CONSONANT_E_CONSONANTS: Strings = [
  "d",
  "k",
  "f",
  "l",
  "m",
  "n",
  "p",
  "t",
  "v",
];

const COMPOUND_ENDINGS: Strings = [
  "are",
  "er",
  "ow",
  "ew",
  "ire",
  "ear",
  "ure",
];

export function buildWordParts(difficulty: Difficulties): Strings {
  let wordParts: Strings;
  switch (getWordTypeAtRandom(difficulty)) {
    case WordType.Simple:
      wordParts = [
        choice(START_SOUNDS),
        getRandomMiddleSound(difficulty),
        choice(END_SOUNDS),
      ];
      break;
    case WordType.VowelConsonantE:
      wordParts = [
        choice(START_SOUNDS),
        choice(VOWELS),
        choice(VOWEL_CONSONANT_E_CONSONANTS),
        "e",
      ];
      break;
    case WordType.ComplexEnding:
      wordParts = [choice(START_SOUNDS), choice(COMPOUND_ENDINGS)];
      break;
  }

  return wordParts.filter((p) => !!p);
}

function getRandomMiddleSound(difficulty: Difficulties): string {
  let candidateMiddleSounds: Strings;
  switch (difficulty) {
    case Difficulties.Set1:
      candidateMiddleSounds = SET_1_MIDDLE_SOUNDS;
      break;
    case Difficulties.Set2:
      candidateMiddleSounds = SET_2_MIDDLE_SOUNDS;
      break;
    case Difficulties.Set3:
      candidateMiddleSounds = SET_3_MIDDLE_SOUNDS;
      break;
  }
  return choice(candidateMiddleSounds);
}

function getWordTypeAtRandom(difficulty: Difficulties): WordType {
  if (difficulty === Difficulties.Set3) {
    return getSet3TypeAtRandom();
  } else {
    return WordType.Simple;
  }
}

function getSet3TypeAtRandom(): WordType {
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
