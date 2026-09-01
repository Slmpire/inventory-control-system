import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';

function AppContent() {
  const { user, logout } = useAuth();

  if (!user) return <LoginForm />;

  return (
    <div>
      <p>Welcome, {user.username} ({user.role})</p>
      <button onClick={logout}>Sign out</button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}