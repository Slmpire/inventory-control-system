import React from 'react';
import { LayoutDashboard, Package, ArrowLeftRight, FileText, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TABS = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard, roles: ['Administrator', 'Store Keeper', 'Sales'] },
  { id: 'items', label: 'Stock', icon: Package, roles: ['Administrator', 'Store Keeper'] },
  { id: 'transactions', label: 'Sales', icon: ArrowLeftRight, roles: ['Administrator', 'Store Keeper', 'Sales'] },
  { id: 'reports', label: 'Reports', icon: FileText, roles: ['Administrator', 'Store Keeper', 'Sales'] },
  { id: 'users', label: 'Users', icon: Users, roles: ['Administrator'] },
];

export default function BottomNav({ currentPage, onNavigate }) {
  const { user } = useAuth();

  return (
    <div className="bottom-nav">
      {TABS.filter((t) => t.roles.includes(user.role)).map((t) => {
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