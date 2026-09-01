import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ currentPage, onNavigate, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div style={{ flex: 1, padding: '20px 28px', overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}