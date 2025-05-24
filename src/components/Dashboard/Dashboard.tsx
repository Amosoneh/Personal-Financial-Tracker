import React from 'react';
import './Dashboard.css';

interface DashboardProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  recentTransactions: any[];
  onAddIncome: () => void;
  onAddExpense: () => void;
  onManageCategories: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  totalIncome,
  totalExpenses,
  balance,
  recentTransactions,
  onAddIncome,
  onAddExpense,
  onManageCategories
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Financial Overview</h2>
      </div>
      
      <div className="dashboard-summary">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <p className="amount">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="summary-card expenses">
          <h3>Total Expenses</h3>
          <p className="amount">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="summary-card balance">
          <h3>Balance</h3>
          <p className="amount">{formatCurrency(balance)}</p>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className="btn primary" onClick={onAddIncome}>Add Income</button>
        <button className="btn secondary" onClick={onAddExpense}>Add Expense</button>
        <button className="btn tertiary" onClick={onManageCategories}>Manage Categories</button>
      </div>
    </div>
  );
};

export default Dashboard;
