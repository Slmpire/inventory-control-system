import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function UserForm({ onUserAdded }) {
  const [form, setForm] = useState({ username: '', password: '', role: 'Store Keeper' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password, role } = form;

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    setSaving(true);
    setError('');

    const { error: dbError } = await supabase.from('users').insert({
      username: username.trim(), password, role,
    });

    setSaving(false);

    if (dbError) {
      setError(dbError.message.includes('duplicate') ? 'That username is already taken.' : 'Could not create the account.');
      return;
    }

    setForm({ username: '', password: '', role: 'Store Keeper' });
    onUserAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid">
        <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="Store Keeper">Store Keeper</option>
          <option value="Administrator">Administrator</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
      {error && <p className="error-text">{error}</p>}
      <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Creating...' : 'Create account'}</button>
    </form>
  );
}