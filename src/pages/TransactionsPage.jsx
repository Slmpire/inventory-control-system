import React, { useState } from 'react';
import TransactionForm from '../components/transactions/TransactionForm';
import StockMovementReport from '../components/reports/StockMovementReport';

export default function TransactionsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <h2>Purchases and sales</h2>
      <p style={{ color: '#666' }}>Record stock received or issued. Quantities update automatically.</p>
      <TransactionForm onRecorded={() => setRefreshKey((k) => k + 1)} />
      <StockMovementReport key={refreshKey} />
    </div>
  );
}