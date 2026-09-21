import React from 'react';
import { LayoutDashboard, Package, ArrowLeftRight, FileText, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TABS = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'items', label: 'Stock', icon: Package },
  { id: 'transactions', label: 'Purchases', icon: ArrowLeftRight },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'users', label: 'Users', icon: Users, adminOnly: true },
];

export default function BottomNav({ currentPage, onNavigate }) {
  const { user } = useAuth();

  return (
    <div className="bottom-nav">
      {TABS.filter((t) => !t.adminOnly || user.role === 'Administrator').map((t) => {
        const Icon = t.icon;
        const active = currentPage === t.id;
        return (
          <button key={t.id} onClick={() => onNavigate(t.id)} className={`bottom-nav-item ${active ? 'active' : ''}`}>
            <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}