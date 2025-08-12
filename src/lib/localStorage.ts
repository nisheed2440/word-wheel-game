export interface GameResult {
  id: string;
  completedAt: Date;
  timeSpent: number; // in seconds
  wordsFound: number;
  totalWords: number;
  foundWords: string[];
  wordsToFind: string[];
}

const LEADERBOARD_KEY = 'word-wheel-leaderboard';

export const saveGameResult = (gameResult: Omit<GameResult, 'id' | 'completedAt'>): void => {
  try {
    const existingResults = getGameResults();
    const newResult: GameResult = {
      ...gameResult,
      id: crypto.randomUUID(),
      completedAt: new Date(),
    };
    
    // Only save completed games (all words found)
    if (newResult.wordsFound !== newResult.totalWords) {
      return;
    }
    
    const allResults = [...existingResults, newResult];
    
    // Sort by completion time (ascending), then by words found (descending)
    const sortedResults = allResults
      .filter(result => result.wordsFound === result.totalWords) // Only completed games
      .sort((a, b) => {
        if (a.timeSpent !== b.timeSpent) {
          return a.timeSpent - b.timeSpent; // Faster times first
        }
        return b.wordsFound - a.wordsFound; // More words found first (tie-breaker)
      })
      .slice(0, 10); // Keep only top 10
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sortedResults));
  } catch (error) {
    console.error('Failed to save game result:', error);
  }
};

export const getGameResults = (): GameResult[] => {
  try {
    const results = localStorage.getItem(LEADERBOARD_KEY);
    if (!results) return [];
    
    const parsed = JSON.parse(results);
    // Convert date strings back to Date objects
    return parsed.map((result: GameResult) => ({
      ...result,
      completedAt: new Date(result.completedAt),
    }));
  } catch (error) {
    console.error('Failed to load game results:', error);
    return [];
  }
};

export const clearLeaderboard = (): void => {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
  } catch (error) {
    console.error('Failed to clear leaderboard:', error);
  }
};

export const getTopResults = (limit: number = 10): GameResult[] => {
  const results = getGameResults();
  
  // Results are already sorted and filtered when saved, just return them
  return results.slice(0, limit);
};

