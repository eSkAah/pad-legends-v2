import { useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../utils/supabase';
import { useToast, handleApiError } from '../hooks/useToast';
import { AuthContext } from './';
import type { AuthContextType } from './AuthContextType';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const { showSuccess, showError } = useToast();

  const fetchProfile = useCallback(async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, [API_URL]);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.access_token);
      }
      
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.access_token);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = async (email: string, password: string, userData?: Record<string, unknown>) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, ...userData }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      showSuccess('Compte créé avec succès ! Bienvenue sur Pad Legends 🎾');
      return data;
    } catch (error) {
      handleApiError(error, showError);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signin failed');
      }

      showSuccess('Connexion réussie ! Bon retour sur Pad Legends 👋');
      return data;
    } catch (error) {
      handleApiError(error, showError);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      if (session?.access_token) {
        await fetch(`${API_URL}/auth/signout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
      }
      
      await supabase.auth.signOut();
      showSuccess('Déconnexion réussie ! À bientôt 👋');
    } catch (error) {
      handleApiError(error, showError);
    }
  };

  const refreshSession = async (): Promise<void> => {
    const { error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Error refreshing session:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};