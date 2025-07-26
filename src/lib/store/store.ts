import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['game/startGame', 'game/resumeGame'],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ['payload.gameStartTime'],
        // Ignore these paths in the state
        ignoredPaths: ['game.gameStartTime'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 