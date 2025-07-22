import { useAuth } from '../contexts/AuthContext';

export const HomePage = () => {
  const { user, profile, signOut } = useAuth();

  return (
    <div className="min-h-screen" style={{ 
      background: `linear-gradient(to bottom right, var(--color-navy-900), var(--color-navy-800), var(--color-navy-700))` 
    }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Bienvenue, {profile?.pseudo || user?.email}!
            </h1>
            <p className="text-gray-400">
              Votre plateforme de matchmaking Padel
            </p>
          </div>
          
          <button
            onClick={signOut}
            className="px-4 py-2 text-white rounded-lg transition-colors"
            style={{ 
              backgroundColor: '#EF4444',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#EF4444'}
          >
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Mon Profil</h3>
            <div className="space-y-3">
              <div>
                <span style={{ color: 'var(--color-gray-400)' }}>Pseudo:</span>
                <span className="text-white ml-2">{profile?.pseudo}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-400)' }}>Email:</span>
                <span className="text-white ml-2">{profile?.email}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-400)' }}>Niveau:</span>
                <span className="text-white ml-2">{profile?.level}/10</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-400)' }}>Côté préféré:</span>
                <span className="text-white ml-2">
                  {profile?.preferred_side === 'left' ? 'Gauche' : 
                   profile?.preferred_side === 'right' ? 'Droite' : 'Indifférent'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <button className="btn-primary w-full">
                Créer une partie
              </button>
              <button className="w-full py-3 text-white font-semibold rounded-lg transition-colors" 
                style={{ backgroundColor: 'var(--color-navy-700)', border: 'none', cursor: 'pointer' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy-600)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy-700)'}>
                Rejoindre une partie
              </button>
              <button className="w-full py-3 text-white font-semibold rounded-lg transition-colors"
                style={{ backgroundColor: 'var(--color-navy-700)', border: 'none', cursor: 'pointer' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy-600)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-navy-700)'}>
                Mes amis
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4">Statistiques</h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--color-amber-400)' }}>0</div>
                <div className="text-sm" style={{ color: 'var(--color-gray-400)' }}>Parties jouées</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#10B981' }}>0</div>
                <div className="text-sm" style={{ color: 'var(--color-gray-400)' }}>Victoires</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#3B82F6' }}>Niveau {profile?.level}</div>
                <div className="text-sm" style={{ color: 'var(--color-gray-400)' }}>Votre niveau</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};