import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function StockMovementReport() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    supabase
      .from('transactions')
      .select('transaction_id, type, quantity, transaction_date, stock_items(item_name)')
      .order('transaction_date', { ascending: false })
      .then(({ data }) => setTransactions(data || []));
  }, []);

  return (
    <div>
      <h3>Stock movement report</h3>
      <table>
        <thead>
          <tr><th>Item</th><th>Type</th><th>Quantity</th><th>Date</th></tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.transaction_id}>
              <td className="low-stock" >{t.stock_items?.item_name}</td>
              <td className="low-stock">{t.type}</td>
              <td className="low-stock" >{t.quantity}</td>
              <td className="low-stock" >{t.transaction_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}