import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout({ currentPage, onNavigate, children }) {
  return (
    <div className="layout">
      <div className="sidebar desktop-only">
        <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      </div>
      <div className="content">{children}</div>
      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}