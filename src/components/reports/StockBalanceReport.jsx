import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function StockBalanceReport() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase.from('stock_items').select('*').order('item_name')
      .then(({ data }) => setItems(data || []));
  }, []);

  const totalValue = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);

  return (
    <div>
      <h3>Stock balance report</h3>
      <table>
        <thead>
          <tr><th>Item</th><th>Quantity</th><th>Unit price</th><th>Value</th></tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.item_id}>
              <td className="low-stock" >{i.item_name}</td>
              <td className="low-stock" >{i.quantity}</td>
              <td className="low-stock" >₦{Number(i.unit_price).toLocaleString()}</td>
              <td className="low-stock" >₦{(i.unit_price * i.quantity).toLocaleString()}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}><strong>Total stock value</strong></td>
            <td><strong>₦{totalValue.toLocaleString()}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}