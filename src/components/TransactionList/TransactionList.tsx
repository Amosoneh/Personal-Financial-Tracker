import React, { useState, useEffect } from 'react';
import './TransactionList.css';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  notes: string;
  createdAt: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  
  // Get unique categories from transactions
  const categories = Array.from(new Set(transactions.map(t => t.category))).sort();
  
  // Apply sorting and filtering whenever dependencies change
  useEffect(() => {
    let result = [...transactions];
    
    // Apply type filter
    if (filterType !== 'all') {
      result = result.filter(transaction => transaction.type === filterType);
    }
    
    // Apply category filter
    if (filterCategory) {
      result = result.filter(transaction => transaction.category === filterCategory);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortField === 'amount') {
        return sortDirection === 'asc' 
          ? a.amount - b.amount 
          : b.amount - a.amount;
      } else if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime() 
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === 'asc'
          ? String(a[sortField]).localeCompare(String(b[sortField]))
          : String(b[sortField]).localeCompare(String(a[sortField]));
      }
    });
    
    setFilteredTransactions(result);
  }, [transactions, sortField, sortDirection, filterType, filterCategory]);
  
  const handleSort = (field: keyof Transaction) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };
  
  return (
    <div className="transaction-list-container">
      <div className="transaction-filters">
        <div className="filter-group">
          <label>Filter by Type:</label>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
          >
            <option value="all">All Transactions</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Filter by Category:</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="transaction-summary">
        <p>
          Showing {filteredTransactions.length} of {transactions.length} transactions
          {filterType !== 'all' && ` (${filterType} only)`}
          {filterCategory && ` in ${filterCategory}`}
        </p>
      </div>
      
      {filteredTransactions.length === 0 ? (
        <div className="empty-transactions">
          <p>No transactions found matching your filters.</p>
        </div>
      ) : (
        <div className="transaction-table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('date')} className={sortField === 'date' ? `sorted-${sortDirection}` : ''}>
                  Date
                </th>
                <th onClick={() => handleSort('type')} className={sortField === 'type' ? `sorted-${sortDirection}` : ''}>
                  Type
                </th>
                <th onClick={() => handleSort('category')} className={sortField === 'category' ? `sorted-${sortDirection}` : ''}>
                  Category
                </th>
                <th onClick={() => handleSort('amount')} className={sortField === 'amount' ? `sorted-${sortDirection}` : ''}>
                  Amount
                </th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <tr key={transaction.id} className={transaction.type}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.type === 'income' ? 'Income' : 'Expense'}</td>
                  <td>{transaction.category}</td>
                  <td className="amount">{formatAmount(transaction.amount)}</td>
                  <td className="notes" title={transaction.notes}>{transaction.notes || '-'}</td>
                  <td>
                    <button 
                      onClick={() => onDelete(transaction.id)}
                      className="btn delete-btn"
                      aria-label={`Delete ${transaction.type} of ${formatAmount(transaction.amount)} for ${transaction.category}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
