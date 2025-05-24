import React from 'react';
import './CsvExport.css';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  notes: string;
  createdAt: string;
}

interface CsvExportProps {
  transactions: Transaction[];
  onExport: () => void;
}

const CsvExport: React.FC<CsvExportProps> = ({ transactions, onExport }) => {
  const handleExport = () => {
    if (transactions.length === 0) {
      alert('No transactions to export');
      return;
    }
    
    // Create CSV content
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date,
        t.type,
        t.category,
        t.amount.toString(),
        `"${t.notes.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `finance_tracker_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Call the onExport callback
    onExport();
  };

  return (
    <div className="csv-export">
      {/* <h3>Export Your Data</h3>
      <p className="export-description">
        Download all your transactions as a CSV file that can be opened in Excel, Google Sheets, or other spreadsheet applications.
      </p> */}
      <button 
        className="btn export-btn"
        onClick={handleExport}
        disabled={transactions.length === 0}
      >
        Export Transactions to CSV
      </button>
      {/* {transactions.length === 0 && (
        <p className="export-note">No transactions available to export</p>
      )}
      {transactions.length > 0 && (
        <p className="export-count">{transactions.length} transactions will be exported</p>
      )} */}
    </div>
  );
};

export default CsvExport;
