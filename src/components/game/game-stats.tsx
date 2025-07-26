"use client";

import { useAppSelector } from '@/lib/store/hooks'
import { 
  selectFormattedTime, 
  selectTotalPoints, 
  selectFoundWords,
  selectGameProgress,
  selectCurrentWord,
  selectWordsRemaining 
} from '@/lib/store/selectors'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export function GameStats() {
  const formattedTime = useAppSelector(selectFormattedTime)
  const totalPoints = useAppSelector(selectTotalPoints)
  const foundWords = useAppSelector(selectFoundWords)
  const gameProgress = useAppSelector(selectGameProgress)
  const currentWord = useAppSelector(selectCurrentWord)
  const wordsRemaining = useAppSelector(selectWordsRemaining)

  return (
    <div className="space-y-4">
      {/* Game Timer and Points */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formattedTime}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalPoints}</div>
          </CardContent>
        </Card>
      </div>

      {/* Current Word */}
      {currentWord && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Word</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold tracking-wider uppercase">
              {currentWord || "Start typing..."}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={gameProgress} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{foundWords.length} found</span>
            <span>{wordsRemaining.length} remaining</span>
          </div>
        </CardContent>
      </Card>

      {/* Found Words */}
      {foundWords.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Found Words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {foundWords.map((word, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {word.toUpperCase()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 