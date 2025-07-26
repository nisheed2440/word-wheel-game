"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface GameLandingProps {
  userName?: string
  onNewGame?: () => void
  onLeaderboard?: () => void
  onRules?: () => void
}

export default function GameLanding({ userName = "User Name", onNewGame, onLeaderboard, onRules }: GameLandingProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80&text=User" />
              <AvatarFallback className="text-lg">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Welcome Text */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold">Welcome</h1>
              <p className="text-muted-foreground">{userName}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full space-y-3">
            <Button size="lg" className="w-full h-12 text-base" onClick={onNewGame}>
              New Game
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-base bg-transparent"
              onClick={onLeaderboard}
            >
              Leaderboard
            </Button>

            <Button variant="outline" size="lg" className="w-full h-12 text-base bg-transparent" onClick={onRules}>
              Rules
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
