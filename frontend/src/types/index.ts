// Profile types based on PRD specifications  
export interface Profile {
  id: string
  email: string
  pseudo: string
  level: number // 1-10 scale
  preferred_side: 'left' | 'right' | 'both'
  avatar_url?: string
  age?: number
  description?: string
  created_at: string
  updated_at: string
  is_verified: boolean
}

// Club types
export interface Club {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  city: string
  phone?: string
  created_at: string
}

// Match types
export interface Match {
  id: string
  creator_id: string
  club_id: string
  scheduled_date: string
  level_min: number
  level_max: number
  status: 'open' | 'full' | 'completed' | 'cancelled'
  participants: string[]
  created_at: string
  updated_at: string
  // Populated fields
  creator?: Profile
  club?: Club
  participant_details?: Profile[]
}

// Friendship types
export interface Friendship {
  id: string
  requester_id: string
  receiver_id: string
  status: 'pending' | 'accepted' | 'blocked'
  created_at: string
  // Populated fields
  requester?: Profile
  receiver?: Profile
}

// Chat message types
export interface ChatMessage {
  id: string
  match_id: string
  sender_id: string
  content: string
  created_at: string
  // Populated fields
  sender?: Profile
}

// User statistics types
export interface UserStats {
  id: string
  user_id: string
  matches_played: number
  matches_won: number
  matches_lost: number
  current_streak: number
  badges: string[]
  updated_at: string
}

// API response types
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

// Badge types
export type BadgeType = 
  | 'rookie'
  | 'social' 
  | 'regular'
  | 'veteran'
  | 'legend'
  | 'streak_master'
  | 'explorer'
  | 'community_builder'