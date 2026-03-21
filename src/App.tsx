import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { useSyncUser } from './hooks/useSyncUser';

function Dashboard() {
  const { user } = useUser();
  const { synced } = useSyncUser();

  if (!synced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
         <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-4" />
         <p className="text-slate-500 font-medium">Setting up your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-bold text-slate-800">AI Calories Tracker</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">
            {user?.firstName || 'User'}
          </span>
          <img src={user?.imageUrl} alt="Avatar" className="w-8 h-8 rounded-full shadow-sm" />
        </div>
      </header>

      <main>
        <div className="glass-panel p-6 rounded-2xl border border-emerald-100 bg-emerald-50/50">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-2">Welcome Back!</h2>
          <p className="text-emerald-600/80">You have no tracked meals yet. Start tracking to achieve your 2000 cal daily goal.</p>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" replace />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/sign-in/*"
        element={
          <SignedOut>
            <SignInPage />
          </SignedOut>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <SignedOut>
            <SignUpPage />
          </SignedOut>
        }
      />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
