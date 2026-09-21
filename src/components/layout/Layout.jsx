import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout({ currentPage, onNavigate, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (pageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <div className="layout">
      <div className="mobile-topbar">
        <div className="mobile-topbar-brand">StockKeeper</div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : 'desktop-only'}`}>
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      <div className="content">{children}</div>

      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}