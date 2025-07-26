"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Sun, Moon } from "lucide-react";

interface MobileNavProps {
  onQuitGame?: () => void;
  onThemeToggle?: () => void;
  currentTheme?: "light" | "dark";
}

export default function Component({
  onQuitGame,
  onThemeToggle,
  currentTheme = "light",
}: MobileNavProps) {
  const [timeSpent, setTimeSpent] = useState(0); // Time in seconds
  const [isGameActive, setIsGameActive] = useState(true);
  const [showQuitModal, setShowQuitModal] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isGameActive && timeSpent < 3600) {
      // Max 60:00 minutes (3600 seconds)
      interval = setInterval(() => {
        setTimeSpent((prevTime) => {
          if (prevTime >= 3599) {
            // Stop at 59:59
            setIsGameActive(false);
            return 3599;
          }
          return prevTime + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, timeSpent]);

  const handleClose = () => {
    setShowQuitModal(true);
  };

  const handleQuitConfirm = () => {
    setIsGameActive(false);
    setShowQuitModal(false);
    onQuitGame?.();
  };

  const handleQuitCancel = () => {
    setShowQuitModal(false);
  };

  const toggleTheme = () => {
    onThemeToggle?.();
  };

  return (
    <nav className="flex items-center justify-between w-full h-14 px-4 bg-muted">
      {/* Close Button - Left */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="h-10 w-10 rounded-full"
        aria-label="Close game"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Timer - Center */}
      <div className="flex-1 flex justify-center">
        <div className="bg-muted px-4 py-2 rounded-full">
          <span className="text-lg font-mono font-semibold tabular-nums">
            {formatTime(timeSpent)}
          </span>
        </div>
      </div>

      {/* Theme Switch - Right */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-10 w-10 rounded-full"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Quit Confirmation Modal */}
      <Dialog open={showQuitModal} onOpenChange={setShowQuitModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Quit Game?</DialogTitle>
            <DialogDescription>
              Are you sure you want to quit the current game? Your progress will
              be lost and cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleQuitCancel}
              className="w-full sm:w-auto bg-transparent"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleQuitConfirm}
              className="w-full sm:w-auto"
            >
              Yes, Quit Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
