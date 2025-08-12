"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getTopResults,
  clearLeaderboard,
  type GameResult,
} from "@/lib/localStorage";
import { ArrowLeft, Trophy, Trash2, Sun, Moon } from "lucide-react";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function LeaderboardPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [results, setResults] = useState<GameResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    const loadResults = () => {
      const topResults = getTopResults(10);
      setResults(topResults);
      setIsLoading(false);
    };

    loadResults();
  }, []);

  const handleClearLeaderboard = () => {
    setShowClearModal(true);
  };

  const handleClearConfirm = () => {
    clearLeaderboard();
    setResults([]);
    setShowClearModal(false);
  };

  const handleClearCancel = () => {
    setShowClearModal(false);
  };

  const handleBack = () => {
    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-lg">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-muted p-4"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
            title="Go back"
          >
            <ArrowLeft size={16} />
          </Button>

          <div className="flex items-center gap-2">
            {results.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearLeaderboard}
                className="h-9 w-9"
                title="Clear all results"
              >
                <Trash2 size={16} />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
              title="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Trophy className="text-yellow-500" size={32} />
            Leaderboard
          </h1>
          <h2 className="text-xl font-bold text-center">
            Top 10 Best Times
          </h2>
        </motion.div>

        {/* Results */}
        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center py-12"
          >
            <Card className="w-full max-w-sm bg-background/95 backdrop-blur-sm shadow-2xl dark:shadow-none">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Trophy className="mx-auto text-muted-foreground" size={48} />
                  <h3 className="text-xl font-semibold">
                    No games completed yet
                  </h3>
                  <p className="text-muted-foreground">
                    Complete your first word wheel game to see your results
                    here!
                  </p>
                  <Button onClick={handleBack} className="mt-4">
                    Start Playing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-4"
          >
            <div className="grid gap-4">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.05,
                    duration: 0.3,
                  }}
                >
                  <Card className="w-full max-w-sm bg-background/95 backdrop-blur-sm shadow-2xl dark:shadow-none">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <Trophy className="text-yellow-500" size={16} />
                        )}
                        {index === 1 && (
                          <Trophy className="text-gray-400" size={16} />
                        )}
                        {index === 2 && (
                          <Trophy className="text-amber-600" size={16} />
                        )}
                        <CardTitle className="text-base flex items-center justify-between w-full">
                          <span>Rank #{index + 1}</span>
                          <span className="text-base font-mono font-bold">
                            {formatTime(result.timeSpent)}
                          </span>
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {result.foundWords.map((word, wordIndex) => (
                            <Badge
                              key={wordIndex}
                              className="uppercase"
                            >
                              {word}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="text-sm text-muted-foreground">
                      Completed: {formatDate(result.completedAt)}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Clear Confirmation Modal */}
        <Dialog open={showClearModal} onOpenChange={setShowClearModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Clear Leaderboard?</DialogTitle>
              <DialogDescription>
                Are you sure you want to clear the entire leaderboard? This
                action cannot be undone and all game results will be permanently
                deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleClearCancel}
                className="w-full sm:w-auto bg-transparent"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleClearConfirm}
                className="w-full sm:w-auto"
              >
                Yes, Clear All
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
