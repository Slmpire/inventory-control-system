import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ItemsPage from './pages/ItemsPage';
import TransactionsPage from './pages/TransactionsPage';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState('dashboard');

  if (!user) return <LoginPage />;

  const pages = {
    dashboard: <DashboardPage />,
    items: <ItemsPage />,
    transactions: <TransactionsPage />,
    reports: <ReportsPage />,
    users: <UsersPage />,
  };

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {pages[page]}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}