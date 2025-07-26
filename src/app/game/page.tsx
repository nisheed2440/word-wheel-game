"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";

export default function GamePage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleStartGame = () => {
    // Game logic will go here
    console.log("Starting game...");
  };

  const handleRestart = () => {
    // Restart logic will go here
    console.log("Restarting game...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-primary p-6 flex flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center justify-between mb-8"
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold text-primary-foreground">
          Word Wheel Game
        </h1>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRestart}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </Button>
      </motion.div>

      {/* Game Container */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="bg-background/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">
                🎯 Word Wheel
              </CardTitle>
              <p className="text-muted-foreground">
                Find as many words as you can using the letters in the wheel!
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Game Wheel Placeholder */}
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <div className="w-64 h-64 rounded-full border-8 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary animate-pulse">
                    🎪
                  </div>
                </div>
              </motion.div>

              {/* Game Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="grid grid-cols-3 gap-4 text-center"
              >
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-xs text-muted-foreground">Words Found</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">--:--</p>
                  <p className="text-xs text-muted-foreground">Time</p>
                </div>
              </motion.div>

              {/* Start Game Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                <Button
                  onClick={handleStartGame}
                  className="w-full h-14 text-lg font-semibold"
                  size="lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Game
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="text-center text-primary-foreground/80"
      >
        <p className="text-sm">
          Create words using the center letter and any combination of outer letters
        </p>
      </motion.div>
    </motion.div>
  );
} 