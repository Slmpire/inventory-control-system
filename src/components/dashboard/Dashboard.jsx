import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ReorderAlerts from './ReorderAlerts';

export default function Dashboard() {
  const [stats, setStats] = useState({ itemCount: 0, stockValue: 0, txCount: 0 });
  const [recentTx, setRecentTx] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    const { data: items } = await supabase.from('stock_items').select('quantity, unit_price');
    const { data: tx, count } = await supabase
      .from('transactions')
      .select('transaction_id, type, quantity, transaction_date, stock_items(item_name)', { count: 'exact' })
      .order('transaction_date', { ascending: false })
      .limit(5);

    setStats({
      itemCount: items?.length || 0,
      stockValue: (items || []).reduce((sum, i) => sum + i.unit_price * i.quantity, 0),
      txCount: count || 0,
    });
    setRecentTx(tx || []);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p style={{ color: '#666' }}>Current state of your inventory.</p>

      <div style={{ display: 'flex', gap: 12, margin: '16px 0' }}>
        <StatCard label="Stock items" value={stats.itemCount} />
        <StatCard label="Stock value" value={`₦${stats.stockValue.toLocaleString()}`} />
        <StatCard label="Transactions logged" value={stats.txCount} />
      </div>

      <ReorderAlerts />

      <h3>Recent transactions</h3>
      {recentTx.length === 0 ? (
        <p>No transactions recorded yet.</p>
      ) : (
        <table>
          <thead><tr><th>Item</th><th>Type</th><th>Quantity</th><th>Date</th></tr></thead>
          <tbody>
            {recentTx.map((t) => (
              <tr key={t.transaction_id}>
                <td>{t.stock_items?.item_name}</td>
                <td>{t.type}</td>
                <td>{t.quantity}</td>
                <td>{t.transaction_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}