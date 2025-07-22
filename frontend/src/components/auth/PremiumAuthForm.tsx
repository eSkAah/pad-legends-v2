import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { signInSchema, signUpSchema, type SignInFormData, type SignUpFormData } from '../../schemas/auth.schemas';
import { Eye, EyeOff, Sparkles, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

export const PremiumAuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  const { signIn, signUp } = useAuth();

  // Sign in form
  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Sign up form
  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      pseudo: '',
      email: '',
      password: '',
    },
  });

  // Get current form based on mode
  const currentForm = isSignIn ? signInForm : signUpForm;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (data: SignInFormData | SignUpFormData) => {
    setError('');
    setLoading(true);

    try {
      if (isSignIn) {
        const signInData = data as SignInFormData;
        await signIn(signInData.email, signInData.password);
      } else {
        const signUpData = data as SignUpFormData;
        await signUp(signUpData.email, signUpData.password, { pseudo: signUpData.pseudo });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setError('');
    // Reset both forms when switching modes
    signInForm.reset();
    signUpForm.reset();
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
        <form onSubmit={currentForm.handleSubmit(handleSubmit)} className="space-y-6">
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
                  {...signUpForm.register('pseudo')}
                  className={`input-field focus-ring pl-12 ${
                    signUpForm.formState.errors.pseudo ? 'border-red-500 bg-red-500/5' : ''
                  }`}
                  placeholder="Choisissez votre pseudo"
                  disabled={loading}
                />
              </div>
              {signUpForm.formState.errors.pseudo && (
                <p className="mt-2 text-sm text-red-400 animate-fade-in-up">
                  {signUpForm.formState.errors.pseudo.message}
                </p>
              )}
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
                {...(isSignIn ? signInForm.register('email') : signUpForm.register('email'))}
                className={`input-field focus-ring pl-12 ${
                  currentForm.formState.errors.email ? 'border-red-500 bg-red-500/5' : ''
                }`}
                placeholder="votre@email.com"
                disabled={loading}
              />
            </div>
            {currentForm.formState.errors.email && (
              <p className="mt-2 text-sm text-red-400 animate-fade-in-up">
                {currentForm.formState.errors.email.message}
              </p>
            )}
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
                {...(isSignIn ? signInForm.register('password') : signUpForm.register('password'))}
                className={`input-field focus-ring pl-12 pr-12 ${
                  currentForm.formState.errors.password ? 'border-red-500 bg-red-500/5' : ''
                }`}
                placeholder={isSignIn ? 'Votre mot de passe' : 'Minimum 6 caractères'}
                disabled={loading}
              />
              <div
                onClick={() => !loading && setShowPassword(!showPassword)}
                className="input-icon-right cursor-pointer"
              >
                {showPassword ? 
                  <EyeOff size={18} className="text-gray-500 hover:text-amber-400 transition-colors" /> : 
                  <Eye size={18} className="text-gray-500 hover:text-amber-400 transition-colors" />
                }
              </div>
            </div>
            {currentForm.formState.errors.password && (
              <p className="mt-2 text-sm text-red-400 animate-fade-in-up">
                {currentForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button
              type="submit"
              disabled={loading || !currentForm.formState.isValid}
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
          <p className="text-gray-400 text-sm">
            {isSignIn ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
            <span 
              onClick={!loading ? toggleMode : undefined}
              className="font-bold cursor-pointer transition-colors duration-300 disabled:opacity-50"
              style={{ color: 'var(--color-amber-400)' }}
              onMouseEnter={(e) => (e.target as HTMLSpanElement).style.color = 'var(--color-amber-300)'}
              onMouseLeave={(e) => (e.target as HTMLSpanElement).style.color = 'var(--color-amber-400)'}
            >
              {isSignIn ? 'Inscrivez-vous' : 'Connectez-vous'}
            </span>
          </p>
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