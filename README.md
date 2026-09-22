# StockKeeper — Inventory Control System

A simple, computerized Inventory Control System built to solve the problems of manual stock management: inaccurate records, delayed detection of low stock, overstocking, weak data security, and slow reporting.

**Live demo:** [https://inventory-control-system-dun.vercel.app/](https://inventory-control-system-dun.vercel.app/)

## Demo Accounts

| Username | Password    | Role            | Access                                              |
|----------|-------------|-----------------|------------------------------------------------------|
| admin    | admin123    | Administrator   | Full access — items, purchases, sales, reports, users |
| store    | store123    | Store Keeper    | Items, purchases, sales, reports                     |
| (create your own) | — | Sales           | Sales only, reports (view only)                      |

*Passwords are stored in plain text for this prototype — not suitable for production use without hashing.*

## Features

- **Login & Authentication** — role-based access for Administrator, Store Keeper, and Sales roles
- **Stock Item Management** — add and view items, with unit of measurement (kg, litres, pcs, cartons, etc.)
- **Purchases (Stock-In)** — record stock received; quantity updates automatically
- **Sales (Stock-Out)** — record stock issued; blocked if requested quantity exceeds available stock
- **Re-Order Alerts** — automatic flagging of items at or below their re-order level
- **Reports** — stock balance, stock movement, low-stock, and stock valuation (cost sold / cost remaining / total value)
- **User Management** — Administrator-only creation of staff accounts and role assignment
- **Role Restrictions** — Sales role can only record sales; cannot add, edit, or view full stock management
- **Responsive Design** — sidebar navigation on desktop, WhatsApp-style bottom tab bar on mobile

## Tech Stack

- **Frontend:** React (Vite)
- **Backend / Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **Icons:** lucide-react

## Project Structure

```
inventory-control-system/
├── src/
│   ├── components/
│   │   ├── auth/          # Login form
│   │   ├── layout/        # Sidebar, bottom nav, layout wrapper
│   │   ├── dashboard/     # Dashboard summary, re-order alerts
│   │   ├── items/         # Stock item form & list
│   │   ├── transactions/  # Purchase/sale form
│   │   ├── reports/       # Stock balance, movement, low-stock, valuation
│   │   └── users/         # User management (admin only)
│   ├── pages/              # One page per module
│   ├── context/            # AuthContext (logged-in user state)
│   ├── lib/                # Supabase client
│   └── index.css           # Global styles
├── .env                     # Supabase credentials (not committed)
└── package.json
```

## Database Schema

Four core tables: `users`, `suppliers`, `stock_items`, `transactions`, related as follows:

- Each **stock item** belongs to a supplier.
- Each **transaction** references one stock item and the user who recorded it.
- A transaction's `type` is either `Purchase` (increases stock) or `Sale` (decreases stock).

## Local Setup

```bash
git clone <your-repo-url>
cd inventory-control-system
npm install
```

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the database schema (found in `/sql/schema.sql` or your Supabase SQL Editor history) to create the tables and seed the demo accounts.

```bash
npm run dev
```

## Known Limitations (Prototype Scope)

- Single-location only — no multi-branch synchronization
- No barcode scanning integration
- No predictive demand forecasting
- Stock valuation uses each item's *current* price, not price-at-time-of-sale
- Row Level Security is currently set to open access for demo purposes — a production deployment would scope policies by authenticated role

