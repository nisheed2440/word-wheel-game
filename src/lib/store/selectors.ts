import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Basic selectors
export const selectGame = (state: RootState) => state.game
export const selectTimeSpent = (state: RootState) => state.game.timeSpent
export const selectTotalPoints = (state: RootState) => state.game.totalPoints
export const selectAllWords = (state: RootState) => state.game.allWords
export const selectWordsToFind = (state: RootState) => state.game.wordsToFind
export const selectFoundWords = (state: RootState) => state.game.foundWords
export const selectCurrentWord = (state: RootState) => state.game.currentWord
export const selectIsGameActive = (state: RootState) => state.game.isGameActive
export const selectGameStartTime = (state: RootState) => state.game.gameStartTime
export const selectAnimationStarted = (state: RootState) => state.game.animationStarted
export const selectGameCompleted = (state: RootState) => state.game.gameCompleted

// Computed selectors
export const selectFormattedTime = createSelector(
  [selectTimeSpent],
  (timeSpent) => {
    const minutes = Math.floor(timeSpent / 60)
    const seconds = timeSpent % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
)

export const selectWordsRemaining = createSelector(
  [selectWordsToFind, selectFoundWords],
  (wordsToFind, foundWords) => {
    return wordsToFind.filter(word => !foundWords.includes(word))
  }
)

export const selectGameProgress = createSelector(
  [selectWordsToFind, selectFoundWords],
  (wordsToFind, foundWords) => {
    if (wordsToFind.length === 0) return 0
    return Math.round((foundWords.length / wordsToFind.length) * 100)
  }
)

export const selectIsWordValid = createSelector(
  [selectCurrentWord, selectAllWords],
  (currentWord, allWords) => {
    return currentWord.length > 0 && allWords.includes(currentWord.join('').toLowerCase())
  }
)

export const selectIsWordAlreadyFound = createSelector(
  [selectCurrentWord, selectFoundWords],
  (currentWord, foundWords) => {
    return foundWords.includes(currentWord.join('').toLowerCase())
  }
)

export const selectCanSubmitWord = createSelector(
  [selectIsWordValid, selectIsWordAlreadyFound],
  (isValid, alreadyFound) => {
    return isValid && !alreadyFound
  }
)

export const selectCurrentWordString = createSelector(
  [selectCurrentWord],
  (currentWord) => {
    return currentWord.join('').toUpperCase()
  }
)

export const selectCurrentWordLoading = createSelector(
  [selectCurrentWord],
  (currentWord) => {
    return currentWord.join('').length < 8
  }
)

export const selectGameStats = createSelector(
  [selectFoundWords, selectTotalPoints, selectTimeSpent, selectGameProgress],
  (foundWords, totalPoints, timeSpent, progress) => ({
    wordsFound: foundWords.length,
    totalPoints,
    timeSpent,
    progress,
    averagePointsPerWord: foundWords.length > 0 ? Math.round(totalPoints / foundWords.length) : 0,
  })
)

export const selectAllWordsFound = createSelector(
  [selectWordsToFind, selectFoundWords],
  (wordsToFind, foundWords) => {
    return wordsToFind.length > 0 && foundWords.length === wordsToFind.length
  }
) 