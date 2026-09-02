import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await login(username, password);
  }

  return (
    <div className="login-wrap">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Sign in</h2>
        <p className="page-subtitle" style={{ marginBottom: 20 }}>Inventory control system</p>

        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: 12 }} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: 12 }} />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="login-demo">
          <p>Demo accounts</p>
          <p>admin / admin123 (Administrator)</p>
          <p>store / store123 (Store Keeper)</p>
        </div>
      </form>
    </div>
  );
}