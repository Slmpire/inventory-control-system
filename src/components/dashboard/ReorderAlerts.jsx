import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ReorderAlerts() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLowStock = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('stock_items').select('*');
    setLowStockItems((data || []).filter((i) => i.quantity <= i.reorder_level));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLowStock();
  }, [fetchLowStock]);

  if (loading) return null;

  if (lowStockItems.length === 0) {
    return <p className="alert-success" style={{ marginBottom: 20 }}>No items currently need re-ordering.</p>;
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Re-order alerts ({lowStockItems.length})</h3>
      {lowStockItems.map((i) => (
        <div key={i.item_id} className="alert-danger">
          <strong>{i.item_name}</strong> is at {i.quantity} units — at or below its re-order level of {i.reorder_level}.
        </div>
      ))}
    </div>
  );
}