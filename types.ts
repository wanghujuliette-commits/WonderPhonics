export interface PhonicsPattern {
  id: string;
  label: string;
  description: string;
  examples: string[];
}

export interface PhonicsCategory {
  id: string;
  title: string;
  patterns: PhonicsPattern[];
}

export interface SyllableData {
  text: string;
  isStressed?: boolean;
}

export interface WordAnalysis {
  word: string;
  syllables: string[];
  phonicsMatches: {
    pattern: string;
    indices: number[]; // Character indices in the full word
  }[];
  sentence: string;
  translation?: string;
}

export interface ExampleSet {
  pattern: string;
  words: string[];
}