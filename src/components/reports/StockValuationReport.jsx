import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function StockValuationReport() {
  const [values, setValues] = useState({ sold: 0, remaining: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function compute() {
      const { data: items } = await supabase.from('stock_items').select('item_id, unit_price, quantity');
      const { data: sales } = await supabase
        .from('transactions')
        .select('quantity, stock_items(unit_price)')
        .eq('type', 'Sale');

      const remaining = (items || []).reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
      const sold = (sales || []).reduce((sum, t) => sum + (t.stock_items?.unit_price || 0) * t.quantity, 0);

      setValues({ sold, remaining, total: sold + remaining });
      setLoading(false);
    }
    compute();
  }, []);

  if (loading) return null;

  return (
    <div>
      <h3>Stock valuation summary</h3>
      <div className="card-grid" style={{ marginBottom: 20 }}>
        <div className="card">
          <p className="stat-label">Cost of stock sold</p>
          <p className="stat-value">₦{values.sold.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="stat-label">Cost of stock remaining</p>
          <p className="stat-value">₦{values.remaining.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="stat-label">Total stock value</p>
          <p className="stat-value">₦{values.total.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}