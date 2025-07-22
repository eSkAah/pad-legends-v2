import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface SignUpFormProps {
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export const SignUpForm = ({ onToggleMode, onSuccess }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password, { pseudo });
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
        <h2 className="text-3xl font-bold text-white mb-2">Inscription</h2>
        <p style={{ color: 'var(--color-gray-400)' }}>Créez votre compte Padel</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="pseudo" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-gray-300)' }}>
            Pseudo *
          </label>
          <input
            id="pseudo"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="input w-full"
            placeholder="Votre pseudo"
            required
            disabled={loading}
            minLength={3}
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-gray-300)' }}>
            Email *
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
            Mot de passe *
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
            placeholder="Minimum 6 caractères"
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email || !password || !pseudo}
          className="btn-primary w-full"
          style={{ 
            opacity: loading || !email || !password || !pseudo ? 0.5 : 1,
            cursor: loading || !email || !password || !pseudo ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Création...' : 'Créer mon compte'}
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
          Déjà un compte ? Connectez-vous
        </button>
      </div>
    </div>
  );
};