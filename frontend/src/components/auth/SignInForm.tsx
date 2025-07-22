import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface SignInFormProps {
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export const SignInForm = ({ onToggleMode, onSuccess }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      onSuccess?.();
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto card">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Connexion</h2>
        <p style={{ color: 'var(--color-gray-400)' }}>Connectez-vous à votre compte</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-gray-300)' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            placeholder="votre@email.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-gray-300)' }}>
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            placeholder="Votre mot de passe"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="btn-primary w-full"
          style={{ 
            opacity: loading || !email || !password ? 0.5 : 1,
            cursor: loading || !email || !password ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={onToggleMode}
          className="text-sm transition-colors"
          style={{ 
            color: 'var(--color-amber-400)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-amber-300)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-amber-400)'}
        >
          Pas de compte ? Créez-en un
        </button>
      </div>
    </div>
  );
};