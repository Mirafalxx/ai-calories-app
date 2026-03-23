import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, useUser, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useSyncUser } from "./hooks/useSyncUser";
import logo from "./assets/images/logo.png";
import { OnboardingForm } from "./components/Onboarding/OnboardingForm";
import { FloatingSidebar } from "./components/Navigation/FloatingSidebar";

function Dashboard() {
  const { user } = useUser();
  const { synced, isOnboarded, setIsOnboarded } = useSyncUser();

  if (!synced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500 mb-4" />
        <p className="text-slate-500 font-medium">Setting up your profile...</p>
      </div>
    );
  }

  if (!isOnboarded) {
    return <OnboardingForm onComplete={() => setIsOnboarded(true)} />;
  }

  return (
    <div className="min-h-screen bg-secondary-50 md:pl-28 pb-28 md:pb-0">
      <FloatingSidebar />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-bold text-slate-800">AI Calories Tracker</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">{user?.firstName || "User"}</span>
          <img src={user?.imageUrl} alt="Avatar" className="w-8 h-8 rounded-full shadow-sm" />
        </div>
      </header>

      <main>
        <div className="glass-panel p-6 rounded-2xl border border-primary-100 bg-primary-50/50">
          <h2 className="text-2xl font-semibold text-primary-800 mb-2">Welcome Back!</h2>
          <p className="text-primary-600/80">
            You have no tracked meals yet. Start tracking to achieve your 2000 cal daily goal.
          </p>
        </div>
      </main>
      </div>
    </div>
  );
}

function App() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Save the user's email in local storage when signed in
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
        localStorage.setItem("userEmail", user.primaryEmailAddress.emailAddress);
      } else if (!isSignedIn) {
        localStorage.removeItem("userEmail");
      }
    }
  }, [isLoaded, isSignedIn, user]);

  // Prevent flash of login screen using localStorage
  const cachedEmail = localStorage.getItem("userEmail");
  if (!isLoaded && cachedEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        <p className="text-slate-500 font-medium">Welcome back, {cachedEmail}...</p>
      </div>
    );
  }

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
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
      <Route
        path="/sign-in/*"
        element={
          <>
            <SignedIn>
              <Navigate to="/" replace />
            </SignedIn>
            <SignedOut>
              <SignInPage />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <>
            <SignedIn>
              <Navigate to="/" replace />
            </SignedIn>
            <SignedOut>
              <SignUpPage />
            </SignedOut>
          </>
        }
      />
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
