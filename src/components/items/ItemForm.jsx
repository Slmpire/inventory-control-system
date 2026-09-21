import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ItemForm({ onItemAdded }) {
  const [form, setForm] = useState({
    item_name: '', item_code: '', unit_price: '', quantity: '', reorder_level: ''
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { item_name, item_code, unit_price, quantity, reorder_level } = form;

    if (!item_name.trim() || !item_code.trim() || !unit_price || quantity === '' || reorder_level === '') {
      setError('Fill in every field before adding the item.');
      return;
    }
    if (Number(unit_price) <= 0 || Number(quantity) < 0 || Number(reorder_level) < 0) {
      setError('Price, quantity, and re-order level must be valid numbers.');
      return;
    }

    setSaving(true);
    setError('');

    const { error: dbError } = await supabase.from('stock_items').insert({
      item_name: item_name.trim(),
      item_code: item_code.trim(),
      unit_price: Number(unit_price),
      quantity: Number(quantity),
      reorder_level: Number(reorder_level),
    });

    setSaving(false);

    if (dbError) {
      setError(dbError.message.includes('duplicate') ? 'That item code already exists.' : 'Could not save the item.');
      return;
    }

    setForm({ item_name: '', item_code: '', unit_price: '', quantity: '', reorder_level: '' });
    onItemAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid">
        <input placeholder="Item name" value={form.item_name} onChange={(e) => update('item_name', e.target.value)} />
        <input placeholder="Item code" value={form.item_code} onChange={(e) => update('item_code', e.target.value)} />
        <input placeholder="Unit price" type="number" value={form.unit_price} onChange={(e) => update('unit_price', e.target.value)} />
        <input placeholder="Opening quantity" type="number" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} />
        <input placeholder="Re-order level" type="number" value={form.reorder_level} onChange={(e) => update('reorder_level', e.target.value)} />
      </div>
      {error && <p className="error-text">{error}</p>}
      <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Add item'}</button>
    </form>
  );
}