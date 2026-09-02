import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function LowStockReport() {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    supabase.from('stock_items').select('*')
      .then(({ data }) => setLowStockItems((data || []).filter((i) => i.quantity <= i.reorder_level)));
  }, []);

  return (
    <div>
      <h3>Low-stock report</h3>
      {lowStockItems.length === 0 ? (
        <p>No items are currently at or below their re-order level.</p>
      ) : (
        <table>
          <thead><tr><th>Item</th><th>Quantity</th><th>Re-order level</th></tr></thead>
          <tbody>
            {lowStockItems.map((i) => (
              <tr key={i.item_id}>
                <td>{i.item_name}</td>
                <td>{i.quantity}</td>
                <td>{i.reorder_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}