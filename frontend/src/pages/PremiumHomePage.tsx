import { useAuth } from '../contexts/AuthContext';
import { LogOut, Plus, Calendar, Users, User, TrendingUp, Award, MapPin, Sparkles } from 'lucide-react';

export const PremiumHomePage = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen premium-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-navy-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gradient">
                Pad Legends
              </h1>
              <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
              <div className="hidden sm:block">
                <span className="text-gray-400 text-sm">Bonjour, </span>
                <span className="text-white font-medium">{profile?.pseudo}</span>
              </div>
            </div>
            
            <button
              onClick={signOut}
              className="group flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 focus-ring border border-transparent hover:border-red-500/20"
            >
              <LogOut size={16} className="group-hover:animate-pulse" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in-up">
          <div className="glass-card text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 backdrop-blur-sm border border-amber-400/30">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Bienvenue sur le terrain, {profile?.pseudo} !
            </h2>
            
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Votre plateforme de matchmaking padel premium. Trouvez des partenaires, organisez des matchs 
              et progressez dans votre jeu avec une communauté passionnée.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">0</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Matchs joués</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">0</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Victoires</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{profile?.level}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Niveau</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 animate-fade-in-up">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button className="glass-card hover:scale-105 transition-all duration-500 text-left group animate-fade-in-up focus-ring">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-400/20 text-amber-400 group-hover:bg-amber-400/30 transition-colors">
                  <Plus size={20} />
                </div>
                <div className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
              <h4 className="font-semibold text-white mb-2">Créer un match</h4>
              <p className="text-sm text-gray-400">Organisez votre prochaine partie</p>
            </button>

            <button className="glass-card hover:scale-105 transition-all duration-500 text-left group animate-fade-in-up focus-ring" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-400/20 text-blue-400 group-hover:bg-blue-400/30 transition-colors">
                  <Calendar size={20} />
                </div>
                <div className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
              <h4 className="font-semibold text-white mb-2">Mes parties</h4>
              <p className="text-sm text-gray-400">Consultez vos matchs programmés</p>
            </button>

            <button className="glass-card hover:scale-105 transition-all duration-500 text-left group animate-fade-in-up focus-ring" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-green-400/20 text-green-400 group-hover:bg-green-400/30 transition-colors">
                  <Users size={20} />
                </div>
                <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
              <h4 className="font-semibold text-white mb-2">Mes amis</h4>
              <p className="text-sm text-gray-400">Gérez votre réseau de joueurs</p>
            </button>

            <button className="glass-card hover:scale-105 transition-all duration-500 text-left group animate-fade-in-up focus-ring" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-400/20 text-purple-400 group-hover:bg-purple-400/30 transition-colors">
                  <MapPin size={20} />
                </div>
                <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
              <h4 className="font-semibold text-white mb-2">Clubs proches</h4>
              <p className="text-sm text-gray-400">Découvrez de nouveaux terrains</p>
            </button>
          </div>
        </div>

        {/* Profile & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="glass-card animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <User className="w-8 h-8 text-navy-900" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-lg">{profile?.pseudo}</h4>
                <p className="text-gray-400 text-sm">{profile?.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Niveau de jeu</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-navy-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${(profile?.level || 0) * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{profile?.level}/10</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Position préférée</span>
                <span className="text-white">
                  {profile?.preferred_side === 'left' ? 'Gauche' : 
                   profile?.preferred_side === 'right' ? 'Droite' : 'Polyvalent'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Statut</span>
                <span className="px-2 py-1 bg-green-400/20 text-green-400 rounded-lg text-xs font-medium">
                  En ligne
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <h4 className="font-semibold text-white text-lg mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-amber-400" />
              Activité récente
            </h4>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-700/50 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400 mb-2">Aucune activité récente</p>
              <p className="text-sm text-gray-500">Créez votre premier match pour commencer !</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-card animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <h4 className="font-semibold text-white text-lg mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-amber-400" />
              Succès
            </h4>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-700/50 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400 mb-2">Premiers pas</p>
              <p className="text-sm text-gray-500">Jouez votre premier match pour débloquer des badges !</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};