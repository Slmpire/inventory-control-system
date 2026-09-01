import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function login(username, password) {
    setLoading(true);
    setError('');
    const { data, error: dbError } = await supabase
      .from('users')
      .select('user_id, username, role')
      .eq('username', username)
      .eq('password', password)
      .single();

    setLoading(false);

    if (dbError || !data) {
      setError('Incorrect username or password.');
      return false;
    }

    setUser(data);
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}