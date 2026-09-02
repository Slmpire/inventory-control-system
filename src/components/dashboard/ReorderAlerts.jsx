import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ReorderAlerts() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLowStock = useCallback(async () => {
    setLoading(true);
    // Supabase can't compare two columns directly in a filter,
    // so we fetch all items and filter on the client side.
    const { data } = await supabase.from('stock_items').select('*');
    const flagged = (data || []).filter((i) => i.quantity <= i.reorder_level);
    setLowStockItems(flagged);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLowStock();
  }, [fetchLowStock]);

  if (loading) return <p>Checking stock levels...</p>;

  if (lowStockItems.length === 0) {
    return <p style={{ color: 'green' }}>No items currently need re-ordering.</p>;
  }

  return (
    <div>
      <h3>Re-order alerts ({lowStockItems.length})</h3>
      {lowStockItems.map((i) => (
        <div key={i.item_id} style={{ background: '#fee', padding: '8px 12px', marginBottom: 6, borderRadius: 6 }}>
          <strong>{i.item_name}</strong> is at {i.quantity} units — at or below its re-order level of {i.reorder_level}.
        </div>
      ))}
    </div>
  );
}