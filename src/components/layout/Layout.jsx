import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ currentPage, onNavigate, children }) {
  return (
    <div className="layout">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="content">{children}</div>
    </div>
  );
}