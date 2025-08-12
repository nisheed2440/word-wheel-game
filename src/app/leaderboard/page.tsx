"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTopResults, clearLeaderboard, type GameResult } from "@/lib/localStorage";
import { ArrowLeft, Trophy, Trash2 } from "lucide-react";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export default function LeaderboardPage() {
  const router = useRouter();
  const [results, setResults] = useState<GameResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResults = () => {
      const topResults = getTopResults(20);
      setResults(topResults);
      setIsLoading(false);
    };

    loadResults();
  }, []);

  const handleClearLeaderboard = () => {
    if (confirm('Are you sure you want to clear the entire leaderboard? This action cannot be undone.')) {
      clearLeaderboard();
      setResults([]);
    }
  };

  const handleBack = () => {
    router.push('/');
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
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          {results.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearLeaderboard}
              className="flex items-center gap-2"
            >
              <Trash2 size={16} />
              Clear All
            </Button>
          )}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <Trophy className="text-yellow-500" size={32} />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Best completion times for perfect games
          </p>
        </motion.div>

        {/* Results */}
        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center py-12"
          >
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Trophy className="mx-auto text-muted-foreground" size={48} />
                  <h3 className="text-xl font-semibold">No games completed yet</h3>
                  <p className="text-muted-foreground">
                    Complete your first word wheel game to see your results here!
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
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Best Times</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-semibold">Rank</th>
                        <th className="p-4 font-semibold">Time</th>
                        <th className="p-4 font-semibold">Words Found</th>
                        <th className="p-4 font-semibold">Completion Rate</th>
                        <th className="p-4 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <motion.tr
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {index === 0 && (
                                <Trophy className="text-yellow-500" size={20} />
                              )}
                              {index === 1 && (
                                <Trophy className="text-gray-400" size={20} />
                              )}
                              {index === 2 && (
                                <Trophy className="text-amber-600" size={20} />
                              )}
                              <span className="font-semibold">#{index + 1}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="font-mono">
                              {formatTime(result.timeSpent)}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold">{result.wordsFound}</span>
                            <span className="text-muted-foreground">
                              /{result.totalWords}
                            </span>
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant={result.wordsFound === result.totalWords ? "default" : "secondary"}
                            >
                              {Math.round((result.wordsFound / result.totalWords) * 100)}%
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {formatDate(result.completedAt)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

