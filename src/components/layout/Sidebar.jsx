import React from 'react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', roles: ['Administrator', 'Store Keeper', 'Sales'] },
  { id: 'items', label: 'Stock items', roles: ['Administrator', 'Store Keeper'] },
  { id: 'transactions', label: 'Purchases & sales', roles: ['Administrator', 'Store Keeper', 'Sales'] },
  { id: 'reports', label: 'Reports', roles: ['Administrator', 'Store Keeper', 'Sales'] },
  { id: 'users', label: 'User management', roles: ['Administrator'] },
];

export default function Sidebar({ currentPage, onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="sidebar-brand">StockKeeper</div>
      {NAV_ITEMS.filter((item) => item.roles.includes(user.role)).map((item) => (
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
    </>
  );
}