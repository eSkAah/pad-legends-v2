import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PremiumHomePage } from './pages/PremiumHomePage';

function App() {
  return (
    <>
      <AuthProvider>
        <ProtectedRoute>
          <PremiumHomePage />
        </ProtectedRoute>
      </AuthProvider>
      
      {/* Global Toast Notifications */}
      <Toaster 
        position="top-right"
        closeButton
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--color-navy-800)',
            color: 'white',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(16px)',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />
    </>
  );
}

export default App
