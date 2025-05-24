import React, { useState } from 'react';
import './TransactionForm.css';

interface TransactionFormProps {
  type: 'income' | 'expense';
  onSubmit: (transaction: any) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, onSubmit, onCancel }) => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');
  
  // Get categories from localStorage
  const getCategories = () => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories);
      return parsedCategories.filter((cat: any) => cat.type === type);
    }
    
    // Default categories if none in localStorage
    const defaultCategories = type === 'income' 
      ? [
          { id: '1', name: 'Salary', type: 'income' },
          { id: '2', name: 'Freelance', type: 'income' },
          { id: '3', name: 'Investments', type: 'income' },
          { id: '4', name: 'Gifts', type: 'income' },
          { id: '5', name: 'Other Income', type: 'income' }
        ]
      : [
          { id: '6', name: 'Food', type: 'expense' },
          { id: '7', name: 'Housing', type: 'expense' },
          { id: '8', name: 'Transportation', type: 'expense' },
          { id: '9', name: 'Utilities', type: 'expense' },
          { id: '10', name: 'Entertainment', type: 'expense' },
          { id: '11', name: 'Healthcare', type: 'expense' },
          { id: '12', name: 'Shopping', type: 'expense' },
          { id: '13', name: 'Other Expense', type: 'expense' }
        ];
    
    return defaultCategories;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !date) {
      alert('Please fill in all required fields');
      return;
    }
    
    const transaction = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      category,
      date,
      notes,
      createdAt: new Date().toISOString()
    };
    
    onSubmit(transaction);
  };

  return (
    <div className="transaction-form-container">
      <h2>{type === 'income' ? 'Add Income' : 'Add Expense'}</h2>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount*</label>
          <div className="input-with-prefix">
            <span className="input-prefix">#</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category*</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {getCategories().map((cat: any) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date*</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional details..."
            rows={3}
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={`btn ${type === 'income' ? 'primary' : 'secondary'}`}>
            Save {type === 'income' ? 'Income' : 'Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
