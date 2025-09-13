import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (uses service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Database types (TypeScript)
export interface User {
  id: string;
  google_id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface GameSession {
  id: string;
  user_id: string;
  game_type: string;
  score: number;
  level_reached: number;
  correct_answers: number;
  total_questions: number;
  accuracy_percentage: number;
  time_played: number;
  game_duration: number;
  created_at: string;
  users?: User;
}

export interface LeaderboardEntry {
  id: string;
  game_type: string;
  score: number;
  level_reached: number;
  correct_answers: number;
  total_questions: number;
  time_played: number;
  accuracy_percentage: number;
  created_at: string;
  users: {
    id: string;
    name: string;
    avatar_url?: string;
  };
}

export interface UserStats {
  rank: number;
  bestScore: number;
  totalGames: number;
  avgAccuracy: number;
}
