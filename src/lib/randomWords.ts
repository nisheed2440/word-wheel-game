import { dictionary } from './dictionary';

/**
 * Randomly selects 4 unique words from the dictionary
 * @returns An array of exactly 4 unique 8-letter words
 */
export function getRandomWords(): [string, string, string, string] {
  if (dictionary.length < 4) {
    throw new Error('Dictionary must contain at least 4 words');
  }

  const selectedWords: string[] = [];
  const usedIndices = new Set<number>();

  while (selectedWords.length < 4) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    
    // Ensure we don't select the same word twice
    if (!usedIndices.has(randomIndex)) {
      const word = dictionary[randomIndex];
      if (word) {
        usedIndices.add(randomIndex);
        selectedWords.push(word);
      }
    }
  }

  return selectedWords as [string, string, string, string];
}

/**
 * Randomly selects a specified number of unique words from the dictionary
 * @param count - Number of words to select (defaults to 4)
 * @returns An array of unique 8-letter words
 */
export function getRandomWordsCount(count: number = 4): string[] {
  if (count <= 0) {
    throw new Error('Count must be greater than 0');
  }
  
  if (count > dictionary.length) {
    throw new Error(`Cannot select ${count} words from dictionary of ${dictionary.length} words`);
  }

  const selectedWords: string[] = [];
  const usedIndices = new Set<number>();

  while (selectedWords.length < count) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    
    // Ensure we don't select the same word twice
    if (!usedIndices.has(randomIndex)) {
      const word = dictionary[randomIndex];
      if (word) {
        usedIndices.add(randomIndex);
        selectedWords.push(word);
      }
    }
  }

  return selectedWords;
}

/**
 * Generates a random 8-letter combination
 * @returns A random 8-letter string
 */
function generateRandomLetterCombo(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 * @param array - Array to shuffle
 */
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j]!, array[i]!];
  }
}

/**
 * Selects 4 real words from dictionary and generates 8 random letter combinations for WordWheel
 * @returns An array of exactly 12 words (4 real + 8 random) as a tuple type
 */
export function getRandomWordsForWheel(
  realWordsCount: number = 4,
  randomWordsCount: number = 8
): {
    realWords: string[];
    randomWords: string[];
    allWords: string[];
} {
  if (dictionary.length < 4) {
    throw new Error('Dictionary must contain at least 4 words');
  }

  const realWords: string[] = [];
  const randomWords: string[] = [];
  const allWords: string[] = [];
  const usedIndices = new Set<number>();

  // Select 4 real words from dictionary
  while (realWords.length < realWordsCount) {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    
    if (!usedIndices.has(randomIndex)) {
      const word = dictionary[randomIndex];
      if (word) {
        usedIndices.add(randomIndex);
        realWords.push(word.toUpperCase());
      }
    }
  }

  // Generate 8 random letter combinations
  for (let i = 0; i < randomWordsCount; i++) {
    randomWords.push(generateRandomLetterCombo());
  }


  allWords.push(...realWords, ...randomWords);
  shuffleArray(allWords);

  // Ensure we have exactly 12 words before casting
  if (allWords.length === 12) {
    return {
        realWords,
        randomWords,
        allWords
    }
  } else {
    throw new Error('Failed to generate 12 words');
  }
} 