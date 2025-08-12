"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import dynamic from "next/dynamic";

const GameLanding = dynamic(() => import("@/components/game-landing"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();

  const handleNewGame = () => {
    router.push("/game");
  };

  const handleLeaderboard = () => {
    toast.info("🏆 Leaderboard coming soon", {
      description: "Compete with other word masters!",
    });
  };

  const handleRules = () => {
    toast.info("📋 Rules page in development", {
      description: "Learn how to play the Word Wheel Game!",
    });
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 relative"
    >
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-sm">
        <GameLanding
          userName="Player"
          onNewGame={handleNewGame}
          onLeaderboard={handleLeaderboard}
          onRules={handleRules}
        />
      </div>
    </motion.div>
  );
}
