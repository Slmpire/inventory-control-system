import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

export default function TransactionForm({ onRecorded }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ item_id: '', quantity: '', type: 'Purchase' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('stock_items').select('item_id, item_name, quantity').order('item_name')
      .then(({ data }) => setItems(data || []));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { item_id, quantity, type } = form;

    if (!item_id || !quantity || Number(quantity) <= 0) {
      setError('Select an item and enter a valid quantity.');
      return;
    }

    const selectedItem = items.find((i) => i.item_id === Number(item_id));

    if (type === 'Sale' && Number(quantity) > selectedItem.quantity) {
      setError(`Only ${selectedItem.quantity} units of "${selectedItem.item_name}" are in stock. Reduce the quantity.`);
      return;
    }

    setSaving(true);
    setError('');

    const { error: txError } = await supabase.from('transactions').insert({
      item_id: Number(item_id),
      user_id: user.user_id,
      type,
      quantity: Number(quantity),
    });

    if (txError) {
      setSaving(false);
      setError('Could not record the transaction.');
      return;
    }

    const newQuantity = type === 'Purchase'
      ? selectedItem.quantity + Number(quantity)
      : selectedItem.quantity - Number(quantity);

    const { error: updateError } = await supabase
      .from('stock_items')
      .update({ quantity: newQuantity })
      .eq('item_id', item_id);

    setSaving(false);

    if (updateError) {
      setError('Transaction recorded, but stock quantity could not be updated.');
      return;
    }

    setForm({ item_id: '', quantity: '', type: form.type });

    // refresh the local item list so quantities shown in the dropdown stay current
    const { data } = await supabase.from('stock_items').select('item_id, item_name, quantity').order('item_name');
    setItems(data || []);

    onRecorded();
  }

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid">
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="Purchase">Purchase (stock in)</option>
          <option value="Sale">Sale (stock out)</option>
        </select>
        <select value={form.item_id} onChange={(e) => setForm({ ...form, item_id: e.target.value })}>
          <option value="">Select item</option>
          {items.map((i) => (
            <option key={i.item_id} value={i.item_id}>{i.item_name} ({i.quantity} {i.unit} in stock)</option>
          ))}
        </select>
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
      </div>
      {error && <p className="error-text">{error}</p>}
      <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Record transaction'}</button>
    </form>
  );
}