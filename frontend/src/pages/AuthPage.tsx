import { useState } from 'react';
import { SignInForm } from '../components/auth/SignInForm';
import { SignUpForm } from '../components/auth/SignUpForm';

export const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSuccess = () => {
    // Navigation will be handled by the auth context
    console.log('Authentication successful');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      background: `linear-gradient(to bottom right, var(--color-navy-900), var(--color-navy-800), var(--color-navy-700))` 
    }}>
      <div className="w-full max-w-md">
        {isSignIn ? (
          <SignInForm onToggleMode={toggleMode} onSuccess={handleSuccess} />
        ) : (
          <SignUpForm onToggleMode={toggleMode} onSuccess={handleSuccess} />
        )}
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/3 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};