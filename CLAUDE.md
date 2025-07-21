# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Padel Matchmaking PWA** with gamification features. The application helps padel players find matches, organize games, and build a community through social features and achievement systems.

**Key Features:**
- User authentication and profile management
- Match creation and discovery with level-based matching
- Real-time chat rooms for completed matches (4/4 players)
- Friend system and social features
- Gamification with badges and statistics
- Geolocation-based club and match filtering
- Push notifications for match updates

## Technical Stack

**Frontend:**
- React + TypeScript + Vite
- Tailwind CSS + Headless UI
- Zustand or React Query for state management
- Progressive Web App (PWA) with mobile-first design

**Backend:**
- NestJS + TypeScript
- Supabase (PostgreSQL + Auth + Realtime)
- Prisma ORM
- Google Maps API for geolocation

**Key Dependencies:**
- Supabase client for auth and realtime features
- Prisma for database operations
- Tailwind for styling with custom design system
- Push notification APIs

## Database Schema (Supabase)

**Core Tables:**
- `profiles` - User profiles (extends auth.users)
- `clubs` - Padel clubs with geolocation
- `matches` - Game sessions with participants
- `friendships` - Friend relationships
- `chat_messages` - Real-time match chat
- `user_stats` - Player statistics and badges

**Important Fields:**
- User level (1-10 scale: 1-2 Beginner, 3-4 Beginner+, 5-6 Intermediate, 7-8 Advanced, 9-10 Expert)
- Match participants stored as JSONB array
- Real-time subscriptions for chat and match updates

## Architecture Patterns

**Authentication Flow:**
- Supabase Auth with email/password and OAuth (Google/Apple)
- Profile completion during onboarding
- JWT tokens for API authentication

**Real-time Features:**
- Supabase Realtime for chat messages
- WebSocket subscriptions for match updates
- Push notifications via Supabase or Firebase FCM

**State Management:**
- User session and auth state
- Match data and real-time updates
- Friend lists and chat rooms
- Geolocation and club data

## Design System

**Color Palette:**
- Navy blues (900-600) for backgrounds and UI
- Amber (300-500) for CTAs and highlights
- Premium gray scale for text and borders
- System colors for success/warning/error states

**Key UI Principles:**
- Apple-inspired design with glassmorphism effects
- 8px spacing system
- SF Pro Display font stack
- Mobile-first responsive design
- Accessibility WCAG 2.1 AA compliance

## Development Phases

**Phase 1 - MVP:**
- Authentication and user profiles
- Match CRUD operations
- Basic notifications
- Mobile-responsive interface

**Phase 2 - Social:**
- Friend system
- Real-time chat rooms
- Push notifications
- Advanced geolocation filters

**Phase 3 - Gamification:**
- User statistics tracking
- Badge achievement system
- Enhanced user profiles

## Key Business Rules

**Match System:**
- Matches require exactly 4 players to start
- Level matching within ±1 level tolerance
- Automatic chat room creation when match is full
- 1h30 time slots for match scheduling

**Gamification:**
- 8 badge types based on activity milestones
- Statistics tracking for matches played/won/lost
- Streak counters for consecutive victories
- Club loyalty tracking

**Social Features:**
- Friend invitations for private matches
- Real-time chat active until 2h after match end
- Geolocation-based match discovery (5km/10km/20km radius)

## Testing Requirements

**Functional Testing:**
- User can sign up in <2 minutes
- Match creation in <1 minute
- Real-time chat functionality
- Notification delivery <30 seconds
- Offline browsing capability

**Performance:**
- Page load times <3 seconds
- Cross-platform compatibility (iOS Safari, Chrome Android)
- Database optimization for 10k+ users

## Security Considerations

- All sensitive data encrypted
- RGPD compliance for user data
- Privacy-by-design implementation
- JWT token security
- API rate limiting
- Input validation and sanitization