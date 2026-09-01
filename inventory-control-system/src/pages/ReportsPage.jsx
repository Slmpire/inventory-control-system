import React from 'react';
import StockBalanceReport from '../components/reports/StockBalanceReport';
import StockMovementReport from '../components/reports/StockMovementReport';
import LowStockReport from '../components/reports/LowStockReport';

export default function ReportsPage() {
  return (
    <div>
      <h2>Reports</h2>
      <p style={{ color: '#666' }}>Stock balance and low-stock reports, generated from live data.</p>
      <StockBalanceReport />
      <StockMovementReport />
      <LowStockReport />
    </div>
  );
}