import type { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PremiumAuthForm } from './PremiumAuthForm';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen premium-background flex items-center justify-center">
        <div className="auth-card animate-shimmer">
          <div className="flex flex-col items-center space-y-6">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-400 border-t-transparent"></div>
            <div>
              <div className="skeleton h-4 w-24 mb-2"></div>
              <div className="skeleton h-3 w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || <PremiumAuthForm />;
  }

  return <>{children}</>;
};