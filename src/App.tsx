import React, { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionForm from './components/TransactionForm/TransactionForm';
import CategoryManagement from './components/CategoryManagement/CategoryManagement';
import TransactionList from './components/TransactionList/TransactionList';
import ChartComponent from './components/ChartComponent/ChartComponent';
import CsvExport from './components/CsvExport/CsvExport';

// Define types
interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  notes: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

const App: React.FC = () => {
  // State for transactions and categories
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    // Default categories
    { id: '1', name: 'Salary', type: 'income' },
    { id: '2', name: 'Freelance', type: 'income' },
    { id: '3', name: 'Investments', type: 'income' },
    { id: '4', name: 'Gifts', type: 'income' },
    { id: '5', name: 'Other Income', type: 'income' },
    { id: '6', name: 'Food', type: 'expense' },
    { id: '7', name: 'Housing', type: 'expense' },
    { id: '8', name: 'Transportation', type: 'expense' },
    { id: '9', name: 'Utilities', type: 'expense' },
    { id: '10', name: 'Entertainment', type: 'expense' },
    { id: '11', name: 'Healthcare', type: 'expense' },
    { id: '12', name: 'Shopping', type: 'expense' },
    { id: '13', name: 'Other Expense', type: 'expense' },
  ]);
  
  // UI state
  const [showIncomeForm, setShowIncomeForm] = useState<boolean>(false);
  const [showExpenseForm, setShowExpenseForm] = useState<boolean>(false);
  const [showCategoryManagement, setShowCategoryManagement] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  
  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const savedTransactions = localStorage.getItem('finance_tracker_transactions');
      const savedCategories = localStorage.getItem('finance_tracker_categories');
      
      if (savedTransactions) {
        const parsedTransactions = JSON.parse(savedTransactions);
        if (Array.isArray(parsedTransactions)) {
          setTransactions(parsedTransactions);
        }
      }
      
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        if (Array.isArray(parsedCategories)) {
          setCategories(parsedCategories);
        }
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // If there's an error, we'll use the default state values
    } finally {
      setDataLoaded(true);
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!dataLoaded) return; // Skip initial render
    
    try {
      localStorage.setItem('finance_tracker_transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions to localStorage:', error);
      alert('Failed to save your transactions. Your browser storage might be full or restricted.');
    }
  }, [transactions, dataLoaded]);
  
  useEffect(() => {
    if (!dataLoaded) return; // Skip initial render
    
    try {
      localStorage.setItem('finance_tracker_categories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories to localStorage:', error);
      alert('Failed to save your categories. Your browser storage might be full or restricted.');
    }
  }, [categories, dataLoaded]);
  
  // Calculate summary data
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  // Handle adding a new transaction
  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions(prevTransactions => [...prevTransactions, transaction]);
    setShowIncomeForm(false);
    setShowExpenseForm(false);
  };
  
  // Handle deleting a transaction
  const handleDeleteTransaction = (id: number) => {
    setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
  };
  
  // Handle saving categories
  const handleSaveCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    setShowCategoryManagement(false);
  };
  
  // Handle CSV export
  const handleExportCsv = () => {
    // This is now handled directly in the CsvExport component
  };
  
  // Handle data reset (for testing)
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      try {
        localStorage.removeItem('finance_tracker_transactions');
        localStorage.removeItem('finance_tracker_categories');
        
        setTransactions([]);
        setCategories([
          { id: '1', name: 'Salary', type: 'income' },
          { id: '2', name: 'Freelance', type: 'income' },
          { id: '3', name: 'Investments', type: 'income' },
          { id: '4', name: 'Gifts', type: 'income' },
          { id: '5', name: 'Other Income', type: 'income' },
          { id: '6', name: 'Food', type: 'expense' },
          { id: '7', name: 'Housing', type: 'expense' },
          { id: '8', name: 'Transportation', type: 'expense' },
          { id: '9', name: 'Utilities', type: 'expense' },
          { id: '10', name: 'Entertainment', type: 'expense' },
          { id: '11', name: 'Healthcare', type: 'expense' },
          { id: '12', name: 'Shopping', type: 'expense' },
          { id: '13', name: 'Other Expense', type: 'expense' },
        ]);
        
        alert('All data has been reset successfully.');
      } catch (error) {
        console.error('Error resetting data:', error);
        alert('Failed to reset data. Please try again.');
      }
    }
  };
  
  return (
    <Layout>
      {/* Conditional rendering for forms and management */}
      {showIncomeForm && (
        <TransactionForm 
          type="income" 
          onSubmit={handleAddTransaction} 
          onCancel={() => setShowIncomeForm(false)} 
        />
      )}
      
      {showExpenseForm && (
        <TransactionForm 
          type="expense" 
          onSubmit={handleAddTransaction} 
          onCancel={() => setShowExpenseForm(false)} 
        />
      )}
      
      {showCategoryManagement && (
        <CategoryManagement 
          initialCategories={categories} 
          onSave={handleSaveCategories} 
          onCancel={() => setShowCategoryManagement(false)} 
        />
      )}
      
      {/* Main dashboard view when no forms are shown */}
      {!showIncomeForm && !showExpenseForm && !showCategoryManagement && (
        <div className="app-container">
          <Dashboard 
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
            recentTransactions={transactions.slice(0, 5)}
            onAddIncome={() => setShowIncomeForm(true)}
            onAddExpense={() => setShowExpenseForm(true)}
            onManageCategories={() => setShowCategoryManagement(true)}
          />
          
          <div className="app-sections">
            <div className="app-section">
              <h2>Transactions</h2>
              <TransactionList 
                transactions={transactions} 
                onDelete={handleDeleteTransaction} 
              />
            </div>
            
            <div className="app-section">
              <ChartComponent 
                transactions={transactions}
              />
            </div>
          </div>
          
          <CsvExport 
            transactions={transactions} 
            onExport={handleExportCsv} 
          />
          
          <div className="app-footer">
            <button onClick={handleResetData} className="btn reset-btn">
              Reset All Data
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
