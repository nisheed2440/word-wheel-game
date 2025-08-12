"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MobileNav from "@/components/mobile-nav";
import { useTheme } from "next-themes";
import { WordWheel } from "@/components/word-wheel";
import { CurrentWord } from "@/components/current-word";
import { TouchHandler } from "@/components/game/touch-handler";
import { usePreventScroll } from "@/hooks/use-prevent-scroll";
import {
  selectAllWords,
  selectCurrentWordLoading,
  selectCurrentWordString,
  selectIsGameActive,
  selectWordsToFind,
  selectAnimationStarted,
  selectFoundWords,
  selectAllWordsFound,
  selectGameCompleted,
  selectTimeSpent,
  selectGameStartTime,
} from "@/lib/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  addFoundWord,
  setAnimationStarted,
  setCurrentWord,
  startGame,
  setGameCompleted,
  resetGame,
  updateTime,
} from "@/lib/store/gameSlice";
import { useEffect } from "react";
import { TouchButton } from "@/components/ui/touch-button";
import { cx } from "class-variance-authority";
import { triggerGameCompleteConfetti } from "@/lib/confetti";
import { GameCompletionModal } from "@/components/game-completion-modal";

export default function GamePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Prevent page scrolling during game
  usePreventScroll({ enabled: true });
  const currentWord = useSelector(selectCurrentWordString);
  const currentWordLoading = useSelector(selectCurrentWordLoading);
  const wordsToFind = useSelector(selectWordsToFind);
  const foundWords = useSelector(selectFoundWords);
  const allWords = useSelector(selectAllWords);
  const isGameActive = useSelector(selectIsGameActive);
  const animationStarted = useSelector(selectAnimationStarted);
  const allWordsFound = useSelector(selectAllWordsFound);
  const gameCompleted = useSelector(selectGameCompleted);
  const timeSpent = useSelector(selectTimeSpent);
  const gameStartTime = useSelector(selectGameStartTime);
  const dispatch = useDispatch();
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  useEffect(() => {
    console.log(wordsToFind);
    console.log(foundWords);
  }, [wordsToFind, foundWords]);

  // Timer effect to update elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isGameActive && gameStartTime && !gameCompleted) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - gameStartTime) / 1000);
        dispatch(updateTime(elapsed));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, gameStartTime, gameCompleted, dispatch]);

  // Trigger confetti and mark game as completed when all words are found
  useEffect(() => {
    if (allWordsFound && !gameCompleted) {
      triggerGameCompleteConfetti();
      dispatch(setGameCompleted(true));
    }
  }, [allWordsFound, gameCompleted, dispatch]);

  const handleLettersAtTop = (
    letters: string,
    sectorIndex: number,
    wheelIndex: number
  ) => {
    dispatch(setCurrentWord({ index: wheelIndex, letters }));
  };

  const handleCheckWord = () => {
    dispatch(setAnimationStarted(true));
  };

  const handleNewGame = () => {
    dispatch(startGame());
  };

  const handleMainMenu = () => {
    dispatch(resetGame());
    router.push("/");
  };

  return (
    <TouchHandler className="min-h-screen bg-muted flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="min-h-screen bg-muted flex flex-col"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <MobileNav
            onQuitGame={handleBack}
            onThemeToggle={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            currentTheme={theme as "light" | "dark"}
          />
        </motion.div>

        <div className="space-y-4 flex-1 flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              className="flex items-center justify-between mb-8"
            >
              <CurrentWord
                word={currentWord}
                secretWords={wordsToFind}
                isLoading={currentWordLoading && isGameActive}
                onErrorAnimationStart={() =>
                  dispatch(setAnimationStarted(true))
                }
                onSuccessAnimationStart={() =>
                  dispatch(setAnimationStarted(true))
                }
                onWordMatch={() => {
                  console.log("adding found word", currentWord);
                  dispatch(addFoundWord(currentWord));
                  dispatch(setAnimationStarted(false));
                }}
                onWordError={() => dispatch(setAnimationStarted(false))}
                checkTrigger={animationStarted ? 1 : 0}
              />
            </motion.div>
          </div>

          {/* Game Container */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-md flex flex-col items-center justify-center"
            >
              <WordWheel
                words={allWords}
                onLettersAtTop={handleLettersAtTop}
                isGameActive={isGameActive}
                disabled={animationStarted}
              />
            </motion.div>
          </div>

          {/* Words left */}
          <div
            className={cx(
              wordsToFind.length - foundWords.length === 0 && "invisible",
              "flex items-center justify-center p-6"
            )}
          >
            <p className="text-md text-muted-foreground">
              {wordsToFind.length - foundWords.length} WORDS LEFT
            </p>
          </div>
          <div className="flex items-center justify-center p-6">
            <TouchButton
              size="lg"
              className="w-full max-w-sm text-lg uppercase font-bold mt-4"
              onClick={handleCheckWord}
              disabled={animationStarted}
              preventTouchDefault={false}
            >
              Check Word
            </TouchButton>
          </div>
        </div>
      </motion.div>
      
      {/* Game Completion Modal */}
      <GameCompletionModal
        isOpen={gameCompleted}
        timeSpent={timeSpent}
        onMainMenu={handleMainMenu}
        onNewGame={handleNewGame}
      />
    </TouchHandler>
  );
}
