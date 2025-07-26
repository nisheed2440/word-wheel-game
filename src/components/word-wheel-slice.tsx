"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { WHEEL_SIZES } from "../constants/wheel-config"

interface WordWheelSliceProps {
  words?: string[]
  letterPairIndices?: [number, number] // e.g., [0,1] for first two letters, [2,3] for third and fourth
  onLettersAtTop?: (letters: string, sectorIndex: number) => void
  initialRotation?: number
  size?: number
  showPointer?: boolean // Optional pointer
  className?: string
}

export function WordWheelSlice({
  words = ["ABSOLUTE", "BIRTHDAY", "COMPUTER", "ELEPHANT", "FEEDBACK", "GRAPHICS", "HOSPITAL", "INTERNET"],
  letterPairIndices = [0, 1], // Default to first two letters
  onLettersAtTop,
  initialRotation = 0,
  size = 280,
  showPointer = true, // Default to showing pointer
  className = "",
}: WordWheelSliceProps) {
  // Motion values for the wheel
  const wheelRotation = useMotionValue(initialRotation)
  const constrainedRotation = useTransform(wheelRotation, (value) => value % 360)

  // Track if we're currently dragging
  const isDragging = useRef(false)
  // Track the last angle for calculating delta
  const lastAngle = useRef(initialRotation)
  // Reference to the wheel element
  const wheelRef = useRef<HTMLDivElement>(null)
  // Track if component has mounted
  const hasMounted = useRef(false)

  // Safe callback function that defers execution
  const safeCallback = (letters: string, sectorIndex: number) => {
    if (onLettersAtTop) {
      setTimeout(() => {
        onLettersAtTop(letters, sectorIndex)
      }, 0)
    }
  }

  // Handle rotation changes
  useEffect(() => {
    const unsubscribe = constrainedRotation.onChange((value) => {
      const { letters, sectorIndex } = getLettersAtTop(value)
      safeCallback(letters, sectorIndex)
    })

    return unsubscribe
  }, [constrainedRotation])

  // Call the callback initially after component mounts
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      const { letters, sectorIndex } = getLettersAtTop(wheelRotation.get())
      safeCallback(letters, sectorIndex)
    }
  }, [])

  // Handle letter pair changes
  useEffect(() => {
    if (hasMounted.current) {
      const { letters, sectorIndex } = getLettersAtTop(wheelRotation.get())
      safeCallback(letters, sectorIndex)
    }
  }, [letterPairIndices])

  // Don't render if no words are provided
  if (!words || words.length === 0) {
    return null
  }

  // Get the specified letter pairs from each word
  const letterPairs = words.map((word) => {
    const [firstIndex, secondIndex] = letterPairIndices
    const firstLetter = word[firstIndex] || ""
    const secondLetter = word[secondIndex] || ""
    return firstLetter + secondLetter
  })

  // Fill remaining slots with empty strings if less than 12 words
  const filledLetterPairs = [...letterPairs]
  while (filledLetterPairs.length < 12) {
    filledLetterPairs.push("")
  }

  // Calculate which letters are at the top
  const getLettersAtTop = (rotation: number) => {
    // Normalize rotation to 0-360
    const normalizedRotation = ((rotation % 360) + 360) % 360

    // Calculate which sector is at the top (0 degrees)
    // Each sector is 30 degrees (360/12)
    // We need to account for the fact that the first sector (index 0) is at the top
    // when rotation is 0, and we rotate clockwise
    const sectorIndex = Math.round((360 - normalizedRotation) / 30) % 12

    // Get the letters for this sector
    const letters = filledLetterPairs[sectorIndex] || ""

    return { letters, sectorIndex }
  }

  // Calculate angle from center to touch point (0° at top, clockwise positive)
  const getAngleFromCenter = (x: number, y: number): number => {
    if (!wheelRef.current) return 0

    const rect = wheelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate angle in radians
    const radians = Math.atan2(x - centerX, centerY - y) // Note: y is inverted
    // Convert to degrees and normalize to 0-360
    let degrees = (radians * 180) / Math.PI
    if (degrees < 0) degrees += 360

    return degrees
  }

  // Handle touch/mouse start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    isDragging.current = true

    // Get the current angle
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    lastAngle.current = getAngleFromCenter(clientX, clientY)
  }

  // Handle touch/mouse move
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return
    e.preventDefault()

    // Get the current angle
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    const currentAngle = getAngleFromCenter(clientX, clientY)

    // Calculate the shortest angular distance
    let deltaAngle = currentAngle - lastAngle.current

    // Handle wrapping around 0/360 degrees
    if (deltaAngle > 180) {
      deltaAngle -= 360
    } else if (deltaAngle < -180) {
      deltaAngle += 360
    }

    // Apply the rotation directly (no inversion needed now)
    wheelRotation.set(wheelRotation.get() + deltaAngle)

    // Update the last angle
    lastAngle.current = currentAngle
  }

  // Handle touch/mouse end
  const handleDragEnd = () => {
    isDragging.current = false

    // Snap to the nearest 30 degrees
    const targetRotation = Math.round(wheelRotation.get() / 30) * 30

    // Animate to the target rotation
    animate(wheelRotation, targetRotation, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    })
  }

  // Font size and line height based on wheel size - using constants
  const getFontSize = (wheelSize: number): number => {
    if (wheelSize >= WHEEL_SIZES[0]) return 20 // 380px wheel
    if (wheelSize >= WHEEL_SIZES[1]) return 20 // 280px wheel
    if (wheelSize >= WHEEL_SIZES[2]) return 18 // 180px wheel
    if (wheelSize >= WHEEL_SIZES[3]) return 14 // 90px wheel
    return 12 // fallback for very small sizes
  }

  const getLineHeight = (wheelSize: number): string => {
    if (wheelSize >= WHEEL_SIZES[0]) return "20px" // 380px wheel
    if (wheelSize >= WHEEL_SIZES[1]) return "20px" // 280px wheel
    if (wheelSize >= WHEEL_SIZES[2]) return "18px" // 180px wheel
    if (wheelSize >= WHEEL_SIZES[3]) return "14px" // 90px wheel
    return "12px" // fallback for very small sizes
  }

  const fontSize = getFontSize(size)
  const lineHeight = getLineHeight(size)

  // Edge distances adjusted for wheel sizes using constants
  const getEdgeDistance = (wheelSize: number): number => {
    if (wheelSize >= WHEEL_SIZES[0]) return 25 // 380px wheel
    if (wheelSize >= WHEEL_SIZES[1]) return 25 // 280px wheel
    if (wheelSize >= WHEEL_SIZES[2]) return 20 // 180px wheel
    if (wheelSize >= WHEEL_SIZES[3]) return 15 // 90px wheel
    return 12 // fallback for very small sizes
  }

  const edgeDistance = getEdgeDistance(size)
  const radius = size / 2 - 2 - edgeDistance // Account for border and appropriate edge distance

  const centerDotSize = Math.max(4, size * 0.025) // Center dot size
  const pointerSize = Math.max(6, size * 0.03) // Pointer size scales with wheel

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ width: size, height: size }}
      ref={wheelRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Optional pointer on the outer edge */}
      {showPointer && (
        <div
          className="absolute left-1/2 z-10"
          style={{
            top: `-${pointerSize * 1.5}px`,
            transform: `translateX(-50%)`,
          }}
        >
          <svg width={pointerSize * 2} height={pointerSize * 1.5} viewBox="0 0 20 15" className="drop-shadow-md">
            <path d="M10 15 L2 0 L18 0 Z" fill="white" stroke="#4A90E2" strokeWidth="1" />
          </svg>
        </div>
      )}

      <motion.div
        className="w-full h-full rounded-full bg-background/95 backdrop-blur-sm border-2 border-primary dark:border-primary relative cursor-grab active:cursor-grabbing"
        style={{ rotate: constrainedRotation }}
      >
        {/* Render the 12 sectors with letter pairs */}
        {filledLetterPairs.map((pair, index) => {
          // Calculate the angle for this sector (30 degrees per sector)
          const angle = index * 30

          // Calculate position on circumference
          const angleInRadians = (angle - 90) * (Math.PI / 180) // -90 to start from top
          const x = Math.cos(angleInRadians) * radius
          const y = Math.sin(angleInRadians) * radius

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
              }}
            >
              {/* Letter pair container - align radially with 4px spacing */}
              <div className="flex flex-col items-center">
                {pair.split("").map((letter, letterIndex) => (
                  <span
                    key={letterIndex}
                    className="text-primary dark:text-white font-bold block"
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight: lineHeight,
                      marginTop: letterIndex === 0 ? "0" : "4px",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          )
        })}

        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            width: centerDotSize,
            height: centerDotSize,
          }}
        />
      </motion.div>
    </div>
  )
}
