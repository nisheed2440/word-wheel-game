export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  lastLoginAt: Date;
  gameStats: GameStats;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  bestScore: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL: string | null;
  score: number;
  rank: number;
} 