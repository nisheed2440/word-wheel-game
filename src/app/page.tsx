'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
            🎯 Word Wheel Game
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Challenge your vocabulary skills with our interactive word wheel game. 
            Find words, climb the leaderboard, and become a word master!
          </p>
        </header>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {session ? (
            // Authenticated user view
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-4">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                )}
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Welcome back!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {session.user?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.user?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
                  onClick={() => {
                    // TODO: Navigate to game
                    alert('Game coming soon!');
                  }}
                >
                  🎮 Start Playing
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      // TODO: Navigate to profile
                      alert('Profile page coming soon!');
                    }}
                  >
                    👤 Profile
                  </button>
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      // TODO: Navigate to leaderboard
                      alert('Leaderboard coming soon!');
                    }}
                  >
                    🏆 Leaderboard
                  </button>
                </div>

                <button
                  onClick={() => signOut()}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            // Unauthenticated user view
            <div className="text-center space-y-6">
              <div className="mb-8">
                <div className="text-6xl mb-4">🔤</div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Ready to Play?
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Sign in with Google to start your word wheel adventure and track your progress!
                </p>
              </div>

              <button
                onClick={() => signIn('google')}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Game Features
                </h3>
                <div className="grid grid-cols-1 gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Interactive word wheel puzzles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Progress tracking and statistics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Competitive leaderboards</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Daily challenges and rewards</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400">
          <p>&copy; 2024 Word Wheel Game. Built with Next.js & NextAuth.js</p>
        </footer>
      </div>
    </div>
  );
}
