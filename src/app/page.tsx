'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after component has mounted and we know the auth status
    if (status !== 'loading' && !session) {
      router.replace('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            🎯 Word Wheel Game
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Challenge your vocabulary skills with our interactive word wheel game. 
            Find words, climb the leaderboard, and become a word master!
          </p>
        </header>

        <div className="max-w-md mx-auto">
          {/* Authenticated user view */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={session.user?.image || ''} alt="Profile" />
                  <AvatarFallback className="text-lg">
                    {session.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">Welcome back!</CardTitle>
                  <CardDescription className="text-base">
                    {session.user?.name}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground">
                    {session.user?.email}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full h-12 text-lg"
                size="lg"
                onClick={() => {
                  toast.success("🎮 Game feature coming soon!", {
                    description: "We're working hard to bring you the best word wheel experience!"
                  });
                }}
              >
                🎮 Start Playing
              </Button>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-10"
                  onClick={() => {
                    toast.info("👤 Profile page in development", {
                      description: "Track your progress and achievements soon!"
                    });
                  }}
                >
                  👤 Profile
                </Button>
                <Button
                  variant="outline"
                  className="h-10"
                  onClick={() => {
                    toast.info("🏆 Leaderboard coming soon", {
                      description: "Compete with other word masters!"
                    });
                  }}
                >
                  🏆 Leaderboard
                </Button>
              </div>

              <Separator />

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  toast.success("👋 Successfully signed out!");
                  signOut({ callbackUrl: '/login' });
                }}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        <footer className="text-center mt-12 text-muted-foreground">
          <p>&copy; 2024 Word Wheel Game. Built with Next.js, NextAuth.js & ShadCN UI</p>
        </footer>
      </div>
    </div>
  );
}
