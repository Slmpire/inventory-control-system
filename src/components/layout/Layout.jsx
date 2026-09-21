import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ currentPage, onNavigate, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavigate(page) {
    onNavigate(page);
    setMenuOpen(false); // auto-close menu after picking a page on mobile
  }

  return (
    <div className="layout">
      <div className="mobile-topbar">
        <span className="mobile-topbar-brand">StockKeeper</span>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      <div className={`sidebar ${menuOpen ? 'mobile-open' : ''}`}>
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} embedded />
      </div>
      <div className="content">{children}</div>
    </div>
  );
}