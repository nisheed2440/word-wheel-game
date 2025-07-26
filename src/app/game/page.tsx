"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MobileNav from "@/components/mobile-nav";
import { useTheme } from "next-themes";
import { WordWheel } from "@/components/word-wheel";
import { CurrentWord } from "@/components/current-word";

export default function GamePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const handleBack = () => {
    router.back();
  };

  const words = [
    "ABSOLUTE", // AB - index 0
    "BIRTHDAY", // BI - index 1
    "COMPUTER", // CO - index 2
    "ELEPHANT", // EL - index 3
    "FEEDBACK", // FE - index 4
    "GRAPHICS", // GR - index 5
    "HOSPITAL", // HO - index 6
    "INTERNET", // IN - index 7
    "JUNCTION", // JU - index 8
    "KEYBOARD", // KE - index 9
    "LANGUAGE", // LA - index 10
    "MOUNTAIN", // MO - index 11
  ];

  const handleLettersAtTop = (
    letters: string,
    sectorIndex: number,
    wheelIndex: number
  ) => {
    console.log(letters, sectorIndex, wheelIndex);
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
              word="ABSOLUTE"
              secretWords={words}
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
            <WordWheel words={words} onLettersAtTop={handleLettersAtTop} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
