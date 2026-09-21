import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ItemForm from './ItemForm';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('stock_items').select('*').order('item_name');
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div>
      <h2>Stock items</h2>
      <p className="page-subtitle">Add and review the items your organization stocks.</p>
      <ItemForm onItemAdded={fetchItems} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item</th><th>Code</th><th>Price</th><th>Quantity</th><th>Re-order level</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.item_id}>
                <td>{i.item_name}</td>
                <td>{i.item_code}</td>
                <td>₦{Number(i.unit_price).toLocaleString()}</td>
                <td className={i.quantity <= i.reorder_level ? 'low-stock' : ''}>{i.quantity}</td>
                <td>{i.reorder_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}