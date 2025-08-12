import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getRandomWordsForWheel } from '@/lib/randomWords'
import { saveGameResult } from '@/lib/localStorage'  

export interface GameState {
  timeSpent: number // Time in seconds
  totalPoints: number
  allWords: string[] // All possible words that can be made from the letters
  wordsToFind: string[] // Target words for the current game session
  foundWords: string[] // Words the user has successfully found
  currentWord: string[] // Word the user is currently building/typing
  isGameActive: boolean // Whether the game timer is running
  gameStartTime: number | null // Timestamp when game started
  animationStarted: boolean // Whether the animation has started
  gameCompleted: boolean // Whether the game has been completed
}

const initialState: GameState = {
  timeSpent: 0,
  totalPoints: 0,
  allWords: [],
  wordsToFind: [],
  foundWords: [],
  currentWord: [],
  isGameActive: false,
  gameStartTime: null,
  animationStarted: false,
  gameCompleted: false,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Game control actions
    startGame: (state) => {
      state.isGameActive = true
      state.gameStartTime = Date.now()
      state.timeSpent = 0
      state.foundWords = []
      state.currentWord = []
      state.totalPoints = 0
      const { realWords, allWords } = getRandomWordsForWheel(1, 11)
      state.allWords = allWords
      state.wordsToFind = realWords
      state.animationStarted = false
      state.gameCompleted = false
    },
    
    pauseGame: (state) => {
      state.isGameActive = false
    },
    
    resumeGame: (state) => {
      state.isGameActive = true
      state.gameStartTime = Date.now() - (state.timeSpent * 1000)
    },
    
    resetGame: (state) => {
      return {
        ...initialState,
        allWords: state.allWords, // Keep the word list
        wordsToFind: state.wordsToFind, // Keep the target words
      }
    },
    
    endGame: (state) => {
      state.isGameActive = false
      state.gameStartTime = null
    },

    // Time management
    updateTime: (state, action: PayloadAction<number>) => {
      state.timeSpent = action.payload
    },

    // Points management
    addPoints: (state, action: PayloadAction<number>) => {
      state.totalPoints += action.payload
    },
    
    setPoints: (state, action: PayloadAction<number>) => {
      state.totalPoints = action.payload
    },

    // Current word management
    setCurrentWord: (state, action: PayloadAction<{index: number, letters: string}>) => {
      state.currentWord[action.payload.index] = action.payload.letters
    },
    
    clearCurrentWord: (state) => {
      state.currentWord = []
    },

    // Found words management
    addFoundWord: (state, action: PayloadAction<string>) => {
      const word = action.payload.toLowerCase()
      if (!state.foundWords.includes(word)) {
        state.foundWords.push(word)
        // Calculate points based on word length
        const points = word.length * 10
        state.totalPoints += points
      }
    },
    
    removeFoundWord: (state, action: PayloadAction<string>) => {
      const word = action.payload.toLowerCase()
      const index = state.foundWords.indexOf(word)
      if (index > -1) {
        state.foundWords.splice(index, 1)
        // Subtract points
        const points = word.length * 10
        state.totalPoints = Math.max(0, state.totalPoints - points)
      }
    },

    // Words setup
    setAllWords: (state, action: PayloadAction<string[]>) => {
      state.allWords = action.payload.map(word => word.toLowerCase())
    },
    
    setWordsToFind: (state, action: PayloadAction<string[]>) => {
      state.wordsToFind = action.payload.map(word => word.toLowerCase())
    },

    setAnimationStarted: (state, action: PayloadAction<boolean>) => {
      state.animationStarted = action.payload
    },

    setGameCompleted: (state, action: PayloadAction<boolean>) => {
      state.gameCompleted = action.payload
      if (action.payload) {
        state.isGameActive = false
      }
    },

    saveGameToLocalStorage: (state) => {
      // Only save if game is completed and client-side
      if (state.gameCompleted && typeof window !== 'undefined') {
        saveGameResult({
          timeSpent: state.timeSpent,
          wordsFound: state.foundWords.length,
          totalWords: state.wordsToFind.length,
          foundWords: state.foundWords,
          wordsToFind: state.wordsToFind,
        })
      }
    },

  },
})

// Export actions
export const {
  startGame,
  pauseGame,
  resumeGame,
  resetGame,
  endGame,
  updateTime,
  addPoints,
  setPoints,
  setCurrentWord,
  clearCurrentWord,
  addFoundWord,
  removeFoundWord,
  setAllWords,
  setWordsToFind,
  setAnimationStarted,
  setGameCompleted,
  saveGameToLocalStorage,
} = gameSlice.actions

// Export reducer
export default gameSlice.reducer 