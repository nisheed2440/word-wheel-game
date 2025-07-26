"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MobileNav from "@/components/mobile-nav";
import { useTheme } from "next-themes";
import { WordWheel } from "@/components/word-wheel";
import { CurrentWord } from "@/components/current-word";
import {
  selectAllWords,
  selectCurrentWordLoading,
  selectCurrentWordString,
  selectIsGameActive,
  selectWordsToFind,
  selectAnimationStarted,
} from "@/lib/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setAnimationStarted,
  setCurrentWord,
  startGame,
} from "@/lib/store/gameSlice";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GamePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const currentWord = useSelector(selectCurrentWordString);
  const currentWordLoading = useSelector(selectCurrentWordLoading);
  const wordsToFind = useSelector(selectWordsToFind);
  const allWords = useSelector(selectAllWords);
  const isGameActive = useSelector(selectIsGameActive);
  const animationStarted = useSelector(selectAnimationStarted);
  const dispatch = useDispatch();
  const handleBack = () => {
    router.back();
  };


  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  const handleLettersAtTop = (
    letters: string,
    sectorIndex: number,
    wheelIndex: number
  ) => {
    dispatch(setCurrentWord({ index: wheelIndex, letters }));
  };

  return (
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
              onErrorAnimationStart={() => dispatch(setAnimationStarted(true))}
              onSuccessAnimationStart={() =>
                dispatch(setAnimationStarted(true))
              }
              onWordMatch={() => dispatch(setAnimationStarted(false))}
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

        <div className="flex items-center justify-center pb-6">
          <Button
            size="lg"
            className="w-full max-w-sm  text-lg uppercase font-bold mt-4"
            onClick={() => dispatch(setAnimationStarted(true))}
            disabled={animationStarted}
          >
            Check Word
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
