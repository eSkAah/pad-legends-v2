import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PremiumHomePage } from './pages/PremiumHomePage';

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <PremiumHomePage />
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App
