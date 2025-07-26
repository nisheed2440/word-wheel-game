# Redux Game State Management

This project uses Redux Toolkit to manage the game state for the Word Wheel Game. The state tracks all aspects of the current game session.

## Game State Structure

```typescript
interface GameState {
  timeSpent: number           // Time in seconds
  totalPoints: number         // Player's current score
  allWords: string[]          // All possible words from letters
  wordsToFind: string[]       // Target words for current game
  foundWords: string[]        // Words player has found
  currentWord: string         // Word player is building
  isGameActive: boolean       // Is the timer running?
  gameStartTime: number | null // When game started
}
```

## Usage Examples

### 1. Using Redux Hooks

```typescript
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { startGame, addFoundWord, setCurrentWord } from '@/lib/store/gameSlice'

function GameComponent() {
  const dispatch = useAppDispatch()
  const currentWord = useAppSelector(state => state.game.currentWord)
  const totalPoints = useAppSelector(state => state.game.totalPoints)
  
  const handleStartGame = () => {
    dispatch(startGame())
  }
  
  const handleWordSubmit = (word: string) => {
    dispatch(addFoundWord(word))
    dispatch(setCurrentWord(''))
  }
}
```

### 2. Using Selectors

```typescript
import { 
  selectFormattedTime, 
  selectGameProgress, 
  selectCanSubmitWord 
} from '@/lib/store/selectors'

function GameStats() {
  const formattedTime = useAppSelector(selectFormattedTime) // "05:23"
  const progress = useAppSelector(selectGameProgress)       // 65 (percentage)
  const canSubmit = useAppSelector(selectCanSubmitWord)     // true/false
}
```

## Available Actions

### Game Control
- `startGame()` - Start a new game session
- `pauseGame()` - Pause the timer
- `resumeGame()` - Resume the timer
- `resetGame()` - Reset all game state except word lists
- `endGame()` - End the current game

### Time Management
- `updateTime(seconds)` - Update elapsed time
- `addPoints(points)` - Add to score
- `setPoints(points)` - Set exact score

### Word Management
- `setCurrentWord(word)` - Set the word being built
- `clearCurrentWord()` - Clear current word
- `addLetterToCurrentWord(letter)` - Add letter to current word
- `removeLastLetterFromCurrentWord()` - Remove last letter
- `addFoundWord(word)` - Add to found words (auto-adds points)
- `removeFoundWord(word)` - Remove from found words

### Game Setup
- `setAllWords(words[])` - Set all possible words
- `setWordsToFind(words[])` - Set target words
- `initializeGame({ allWords, wordsToFind })` - Setup new game

## Available Selectors

### Basic Selectors
- `selectTimeSpent` - Time in seconds
- `selectTotalPoints` - Current score
- `selectCurrentWord` - Word being built
- `selectFoundWords` - Array of found words
- `selectIsGameActive` - Game timer status

### Computed Selectors
- `selectFormattedTime` - Time as "MM:SS"
- `selectGameProgress` - Progress percentage (0-100)
- `selectWordsRemaining` - Words left to find
- `selectCanSubmitWord` - Can current word be submitted?
- `selectGameStats` - Complete game statistics object

## Integration Example

```typescript
// In a game component
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { 
  startGame, 
  addLetterToCurrentWord, 
  addFoundWord,
  clearCurrentWord 
} from '@/lib/store/gameSlice'
import { 
  selectCurrentWord, 
  selectCanSubmitWord,
  selectFormattedTime 
} from '@/lib/store/selectors'

export function WordWheel() {
  const dispatch = useAppDispatch()
  const currentWord = useAppSelector(selectCurrentWord)
  const canSubmit = useAppSelector(selectCanSubmitWord)
  const time = useAppSelector(selectFormattedTime)
  
  const handleLetterClick = (letter: string) => {
    dispatch(addLetterToCurrentWord(letter))
  }
  
  const handleSubmitWord = () => {
    if (canSubmit) {
      dispatch(addFoundWord(currentWord))
      dispatch(clearCurrentWord())
    }
  }
  
  const handleStartGame = () => {
    // Initialize with sample words (replace with real word generation)
    dispatch(initializeGame({
      allWords: ['cat', 'bat', 'tab', 'cab'],
      wordsToFind: ['cat', 'bat', 'tab']
    }))
    dispatch(startGame())
  }
  
  return (
    <div>
      <div>Time: {time}</div>
      <div>Current: {currentWord}</div>
      <button onClick={handleSubmitWord} disabled={!canSubmit}>
        Submit Word
      </button>
    </div>
  )
}
```

## Scoring System

Words are automatically scored when added:
- **Points = word length × 10**
- 3-letter word = 30 points
- 4-letter word = 40 points
- etc.

Points are automatically added/removed when words are found/removed. 