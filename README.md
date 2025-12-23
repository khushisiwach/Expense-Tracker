
# 💰 Expense Tracker — Tailwind CSS, React.js, Node.js, Express.js, MongoDB

A full‑stack web application to record Income and Expenses, visualize transactions with Interactive charts, and monitor spending patterns for better financial control. Built with a React + Tailwind frontend, a Node + Express REST API, and MongoDB for persistent storage.

## 🚀 Features

## Core Functionality
- Income & Expense Management: Add, edit, delete transactions with category, amount, note, and date
- Interactive Charts: Visualize monthly trends and category-wise distribution
- Advanced Filtering: Filter by type (income/expense), date range, and category
- Dashboard Insights: See total balance, total income, total expenses at a glance
- Transaction History: Paginated list with quick search and sorting

## Technical Features
- Modern UI/UX: Responsive React interface styled with Tailwind CSS
- RESTful API: Express.js backend with clean, versioned endpoints
- Database Integration: MongoDB + Mongoose for robust data modeling
- Validation & Errors: Request validation and consistent error responses
- Environment‑based Config: `.env` driven configuration for dev/prod
- (Optional) Authentication: JWT ready structure if you enable user accounts later

---

## 🎯 How It Works
## Architecture Overview

The app is organized into two main services:

1. Backend API Service (Node + Express)
   Handles business logic, CRUD operations, summaries/aggregations, and data validation. Persists data in MongoDB.

2. Frontend Web App (React + Tailwind)
   Provides the user interface: dashboard, transactions pages, charts, filters, and reports. Communicates with the backend via REST.

### Workflow Process

##1. Transaction Creation
- Users add income or expense entries with `amount`, `category`, `note`, and `date`.
- Data is validated on the client and server before storage.

## 2. Categorization & Filtering
- Transactions are stored with their type and category.
- Users can filter by date range, category, and type to inspect specific periods.

## 3. Visualization & Insights
- The frontend queries summary endpoints to render charts (line/bar/pie).
- The dashboard shows Total Balance, Total Income, Total Expenses, and Top Categories.

#### 4. History & Management
- Users view a historical list of transactions and can edit or delete entries.
- Optional features like export (CSV/Excel) can be added later.

---

## 🛠️ Tech Stack

## Backend
- Node.js + Express.js
- MongoDB + Mongoose
- dotenv, cors, helmet
- JWT + bcrypt for authentication

## Frontend
- React Vite
- Tailwind CSS
- Axios for API communication
- React Router for routing
- Charts: Recharts or Chart.js
- 
## 🧱 Project Structure

``` expense-tracker/
├─ client/                      # React + Tailwind
│  ├─ src/
│  │  ├─ components/           # UI components (forms, tables, charts)
│  │  ├─ pages/                # Dashboard, Income, Expenses, Reports
│  │  ├─ context/              # global app state
│  │  ├─ services/             # axios instance & API functions
│  │  ├─ hooks/                # custom hooks
│  │  └─ App.jsx
│  ├─ index.html
│  └─ package.json
├─ server/                      # Node + Express
│  ├─ src/
│  │  ├─ models/               # Mongoose schemas (Transaction, User*)
│  │  ├─ routes/               # /api/transactions, /api/summary
│  │  ├─ controllers/          # route handlers/business logic
│  │  ├─ middleware/           # error handler, auth*
│  │  └─ index.js              # app bootstrap
│  ├─ package.json
├─ .env.example                 # environment variables template
└─ README.md
```

