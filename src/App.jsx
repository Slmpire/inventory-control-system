import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import ItemList from './components/items/ItemList';
import TransactionForm from './components/transactions/TransactionForm';
import ReorderAlerts from './components/dashboard/ReorderAlerts';

function AppContent() {
  const { user, logout } = useAuth();

  if (!user) return <LoginForm />;

  return (
    <div>
    <p>Welcome, {user.username} ({user.role})</p>
    <button onClick={logout}>Sign out</button>
    <ItemList />
  </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <ReorderAlerts />
<ItemList />
<TransactionForm onRecorded={() => window.location.reload()} />
    </AuthProvider>
  );
}