import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Sparkles, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

export const PremiumAuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  const { signIn, signUp } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignIn) {
        await signIn(email, password);
      } else {
        await signUp(email, password, { pseudo });
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setError('');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen premium-background flex items-center justify-center p-4">
        <div className="auth-card animate-shimmer">
          <div className="skeleton h-8 w-48 mx-auto mb-4"></div>
          <div className="skeleton h-4 w-32 mx-auto mb-8"></div>
          <div className="space-y-6">
            <div className="skeleton h-14 w-full"></div>
            <div className="skeleton h-14 w-full"></div>
            <div className="skeleton h-14 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen premium-background flex items-center justify-center p-4">
      <div className="auth-card animate-slide-in-scale">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 backdrop-blur-sm border border-amber-400/30">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Pad Legends
          </h1>
          
          <h2 className="text-xl font-semibold text-white mb-2">
            {isSignIn ? 'Bon retour !' : 'Rejoignez-nous'}
          </h2>
          
          <p className="text-gray-400 text-sm">
            {isSignIn 
              ? 'Connectez-vous à votre compte pour continuer' 
              : 'Créez votre compte et commencez à jouer'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="animate-fade-in-up p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm text-center backdrop-blur-sm">
              {error}
            </div>
          )}

          {!isSignIn && (
            <div className="input-group animate-fade-in-up">
              <label className="input-label flex items-center">
                <User size={16} className="mr-2 text-gray-400" />
                Pseudo *
              </label>
              <div className="relative">
                <div className="input-icon-left">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  className="input-field focus-ring pl-12"
                  placeholder="Choisissez votre pseudo"
                  required={!isSignIn}
                  disabled={loading}
                  minLength={3}
                  maxLength={20}
                />
              </div>
            </div>
          )}

          <div className="input-group animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <label className="input-label flex items-center">
              <Mail size={16} className="mr-2 text-gray-400" />
              Email *
            </label>
            <div className="relative">
              <div className="input-icon-left">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field focus-ring pl-12"
                placeholder="votre@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="input-group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <label className="input-label flex items-center">
              <Lock size={16} className="mr-2 text-gray-400" />
              Mot de passe *
            </label>
            <div className="relative">
              <div className="input-icon-left">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field focus-ring pl-12 pr-12"
                placeholder={isSignIn ? 'Votre mot de passe' : 'Minimum 6 caractères'}
                required
                disabled={loading}
                minLength={isSignIn ? undefined : 6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-icon-right focus-ring"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button
              type="submit"
              disabled={loading || !email || !password || (!isSignIn && !pseudo)}
              className="btn-primary w-full focus-ring group"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-3" />
                  {isSignIn ? 'Connexion...' : 'Création...'}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>{isSignIn ? 'Se connecter' : 'Créer mon compte'}</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </button>
          </div>
        </form>

        {/* Toggle Mode */}
        <div className="mt-8 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent h-px top-1/2"></div>
            <div className="relative bg-navy-900 px-4 mx-auto inline-block">
              <button
                onClick={toggleMode}
                className="group relative text-gray-400 hover:text-white text-sm transition-all duration-500 hover:scale-105 focus-ring rounded-xl px-6 py-3 hover:bg-amber-400/5 border border-transparent hover:border-amber-400/20"
                disabled={loading}
              >
                <div className="flex items-center space-x-2">
                  <span>{isSignIn ? 'Pas encore de compte ?' : 'Déjà un compte ?'}</span>
                  <div className="flex items-center space-x-1 group-hover:space-x-2 transition-all duration-300">
                    <span className="text-amber-400 font-semibold">
                      {isSignIn ? 'Inscrivez-vous' : 'Connectez-vous'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <p className="text-xs text-gray-500">
            En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  );
};