// Wheel configuration constants
export const WHEEL_SIZES = [380, 280, 180, 90] as const

export const LETTER_PAIR_INDICES: readonly [number, number][] = [
  [0, 1], // Largest wheel - index 0,1
  [2, 3], // Second wheel - index 2,3
  [4, 5], // Third wheel - index 4,5
  [6, 7], // Smallest wheel - index 6,7
] as const

// Type definitions for better type safety
export type WheelSize = (typeof WHEEL_SIZES)[number]
export type LetterPairIndex = (typeof LETTER_PAIR_INDICES)[number]
