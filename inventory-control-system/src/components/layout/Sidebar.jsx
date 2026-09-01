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
    <div style={{ width: 190, borderRight: '1px solid #ddd', padding: '16px 12px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginTop: 0 }}>StockKeeper</h3>
      {NAV_ITEMS.filter((item) => !item.adminOnly || user.role === 'Administrator').map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          style={{
            textAlign: 'left', padding: '8px 10px', marginBottom: 4, border: 'none', borderRadius: 6,
            background: currentPage === item.id ? '#e0e0e0' : 'transparent', cursor: 'pointer',
          }}
        >
          {item.label}
        </button>
      ))}
      <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #ddd' }}>
        <p style={{ fontSize: 13, margin: '0 0 8px' }}>{user.username} ({user.role})</p>
        <button onClick={logout}>Sign out</button>
      </div>
    </div>
  );
}