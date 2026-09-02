import React from 'react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'items', label: 'Stock items' },
  { id: 'transactions', label: 'Purchases & sales' },
  { id: 'reports', label: 'Reports' },
  { id: 'users', label: 'User management', adminOnly: true },
];

export default function Sidebar({ currentPage, onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-brand">StockKeeper</div>
      {NAV_ITEMS.filter((item) => !item.adminOnly || user.role === 'Administrator').map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`sidebar-link ${currentPage === item.id ? 'active' : ''}`}
        >
          {item.label}
        </button>
      ))}
      <div className="sidebar-footer">
        <p className="sidebar-user">{user.username}</p>
        <p className="sidebar-role">{user.role}</p>
        <button onClick={logout} style={{ width: '100%' }}>Sign out</button>
      </div>
    </div>
  );
}