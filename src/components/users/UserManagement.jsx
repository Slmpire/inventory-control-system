import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import UserForm from './UserForm';

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    const { data } = await supabase.from('users').select('user_id, username, role').order('username');
    setUsers(data || []);
  }, []);

  useEffect(() => {
    if (user?.role === 'Administrator') fetchUsers();
  }, [user, fetchUsers]);

  // This is the access-control check from our Chapter Three design (3.7):
  // only Administrators reach the User Management module.
  if (user?.role !== 'Administrator') {
    return <p>You don't have permission to view this page. Contact an administrator.</p>;
  }

  return (
    <div>
      <h2>User management</h2>
      <p className="page-subtitle">Create and review staff accounts.</p>
      <UserForm onUserAdded={fetchUsers} />
      <table>
        <thead><tr><th>Username</th><th>Role</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}