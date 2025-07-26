"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MobileNav from "@/components/mobile-nav";
import { useTheme } from "next-themes";
import { WordWheel } from "@/components/word-wheel";
import { CurrentWord } from "@/components/current-word";
import { getRandomWordsForWheel } from "@/lib/randomWords";
import { useMemo, useState } from "react";

export default function GamePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const handleBack = () => {
    router.back();
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

      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-between mb-8"
          >
            <CurrentWord
              word=""
              secretWords={[]}
              isLoading={true}
            />
          </motion.div>
        </div>

        {/* Game Container */}
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md flex flex-col items-center justify-center"
          >
            <WordWheel words={[]} onLettersAtTop={() => {}} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
