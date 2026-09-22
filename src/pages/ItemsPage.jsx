import React from 'react';
import ItemList from '../components/items/ItemList';
import { useAuth } from '../context/AuthContext';

export default function ItemsPage() {
  const { user } = useAuth();

  if (user.role === 'Sales') {
    return <p>You don't have permission to view this page. Contact an administrator.</p>;
  }

  return <ItemList />;
}