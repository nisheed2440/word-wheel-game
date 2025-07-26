"use client"

import { WordWheelSlice } from "./word-wheel-slice"
import { WHEEL_SIZES, LETTER_PAIR_INDICES } from "../constants/wheel-config"
import { Skeleton } from "./ui/skeleton"

interface WordWheelProps {
  words?: string[]
  onLettersAtTop?: (letters: string, sectorIndex: number, wheelIndex: number) => void
  className?: string
}

export function WordWheel({ words = [], onLettersAtTop, className = "" }: WordWheelProps) {
  const rotations = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  if (words.length === 0) {
    return <Skeleton className="rounded-full h-[380px] w-[380px] animate-pulse" />;
  }
  return (
    <div className={`relative ${className}`} style={{ width: WHEEL_SIZES[0], height: WHEEL_SIZES[0] }}>
      {WHEEL_SIZES.map((size, index) => {
        // Initial rotation should be random between 0 and 360 degrees
        const initialRotation = rotations[index % rotations.length]
        return (
        <div
          key={size}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: "translate(-50%, -50%)",
            zIndex: index + 1, // Largest wheel (index 0) has lowest z-index (1), smallest has highest
          }}
        >
          <WordWheelSlice
            words={words}
            letterPairIndices={LETTER_PAIR_INDICES[index]}
            initialRotation={initialRotation}
            onLettersAtTop={
              onLettersAtTop ? (letters, sectorIndex) => onLettersAtTop(letters, sectorIndex, index) : undefined
            }
            size={size}
            showPointer={index === 0} // Only largest wheel shows pointer
          />
        </div>
      )})}
    </div>
  )
}
