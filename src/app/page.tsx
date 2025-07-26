"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GameLanding from "@/components/game-landing";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after component has mounted and we know the auth status
    if (status !== "loading" && !session) {
      router.replace("/login");
    }
  }, [session, status, router]);

  const handleSignOut = () => {
    toast.success("👋 Successfully signed out!");
    signOut({ callbackUrl: "/login" });
  };

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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-64">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state while redirecting
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-64">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Redirecting to login...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10"
    >
      <div className="w-full max-w-sm">
        <GameLanding
          userName={session.user?.name || "User"}
          userImage={session.user?.image || ""}
          onNewGame={handleNewGame}
          onLeaderboard={handleLeaderboard}
          onRules={handleRules}
        />

        {/* Sign Out Button */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <Separator className="mb-4 mt-4" />
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
