"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CurrentWordProps {
  word: string
  secretWords: string[]
  className?: string
  onWordMatch?: () => void
  onWordError?: () => void
  onSuccessAnimationStart?: () => void
  onErrorAnimationStart?: () => void
  checkTrigger?: number
  isLoading?: boolean
}

export function CurrentWord({
  word,
  secretWords,
  className,
  onWordMatch,
  onWordError,
  onSuccessAnimationStart,
  onErrorAnimationStart,
  checkTrigger,
  isLoading = false,
}: CurrentWordProps) {
  const [displayWord, setDisplayWord] = useState("")
  const [previousWord, setPreviousWord] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const normalizedWord = word.padEnd(8, " ").slice(0, 8)

  useEffect(() => {
    setPreviousWord(displayWord)
    setDisplayWord(normalizedWord)
  }, [normalizedWord])

  useEffect(() => {
    if (checkTrigger && checkTrigger > 0) {
      const trimmedWord = normalizedWord.trim().toUpperCase()

      if (secretWords.includes(trimmedWord)) {
        onSuccessAnimationStart?.()
        setTimeout(() => {
          setShowSuccess(true)
        }, 100)
      } else {
        onErrorAnimationStart?.()
        setTimeout(() => {
          setShowError(true)
        }, 100)
      }
    }
  }, [checkTrigger])

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
        onWordMatch?.()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showSuccess, onWordMatch])

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false)
        onWordError?.()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [showError, onWordError])

  const letters = normalizedWord.split("")
  const previousLetters = previousWord.split("")

  if (isLoading) {
    return (
      <div className="space-y-2 select-none">
        <div className="text-center mt-4">
          <Skeleton className="h-6 w-24 mx-auto" />
        </div>
        <Card className={`w-full max-w-sm md:max-w-2xl ${className}`}>
          <CardContent className="p-6">
            <div className="flex justify-center items-center gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="w-10 h-12 md:w-12 md:h-16 rounded-lg" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-2 select-none">
      <div className="text-center mt-4">
        <p className="text-md font-medium uppercase">Current Word</p>
      </div>
      <Card className={`p-0 w-full max-w-sm bg-background/95 backdrop-blur-sm shadow-2xl dark:shadow-none ${className}`}>
        <CardContent className="p-4">
          <div className="flex justify-center items-center gap-2">
            {letters.map((letter, index) => (
              <motion.div
                key={index}
                className={`relative w-10 h-12 rounded-lg border-2 overflow-hidden transition-colors duration-500 ${
                  showSuccess
                    ? "bg-green-500 border-green-600"
                    : showError
                      ? "bg-red-500 border-red-600"
                      : "bg-slate-100 border-slate-300"
                }`}
                animate={
                  showSuccess
                    ? {
                        y: [0, -20, 0],
                        backgroundColor: ["#f1f5f9", "#22c55e", "#f1f5f9"],
                      }
                    : showError
                      ? {
                          x: [0, -10, 10, -10, 10, -5, 5, 0],
                          backgroundColor: [
                            "#f1f5f9",
                            "#ef4444",
                            "#ef4444",
                            "#ef4444",
                            "#ef4444",
                            "#ef4444",
                            "#f1f5f9",
                          ],
                        }
                      : {
                          y: 0,
                          x: 0,
                          backgroundColor: "#f1f5f9",
                        }
                }
                transition={
                  showSuccess
                    ? {
                        delay: index * 0.1,
                        duration: 0.4,
                        ease: "easeInOut",
                      }
                    : showError
                      ? {
                          duration: 0.5,
                          ease: "easeInOut",
                        }
                      : {
                          duration: 0.3,
                        }
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${letter}-${index}`}
                    className={`absolute inset-0 flex items-center justify-center text-lg md:text-2xl font-bold transition-colors duration-500 ${
                      showSuccess ? "text-green-800" : showError ? "text-red-100" : "text-slate-800"
                    }`}
                    initial={previousLetters[index] !== letter ? { y: -64, opacity: 0 } : { y: 0, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={previousLetters[index] !== letter ? { y: 64, opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{
                      type: "tween",
                      duration: 0.15,
                      ease: "easeInOut",
                    }}
                  >
                    {letter === " " ? "" : letter.toUpperCase()}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-px bg-slate-400 opacity-30" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-400 opacity-30" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
