"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Clock } from "lucide-react";

interface GameCompletionModalProps {
  isOpen: boolean;
  timeSpent: number;
  onMainMenu: () => void;
  onNewGame: () => void;
}

export function GameCompletionModal({
  isOpen,
  timeSpent,
  onMainMenu,
  onNewGame,
}: GameCompletionModalProps) {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Dialog open={isOpen}>
      <DialogOverlay className="bg-black/30 z-40" />
      <DialogContent
        className="max-w-xs mx-auto p-0 border-none bg-transparent z-50"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Game Completed</DialogTitle>

        <Card className="w-full bg-background/95 backdrop-blur-sm shadow-2xl rounded-lg">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              className="mx-auto mb-4"
            >
              <Trophy className="w-16 h-16 text-yellow-500" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-primary">
              Congratulations!
            </CardTitle>
            <p className="text-muted-foreground">You found all the words!</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Time</span>
                </div>
                <span className="text-xl font-bold">
                  {formatTime(timeSpent)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onNewGame}
                className="w-full shadow-sm cursor-pointer"
                size="lg"
              >
                New Game
              </Button>

              <Button
                onClick={onMainMenu}
                variant="outline"
                className="w-full shadow-sm cursor-pointer"
                size="lg"
              >
                Main Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
