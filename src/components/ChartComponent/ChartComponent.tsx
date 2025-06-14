import React, { useEffect, useState } from 'react';
import './ChartComponent.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  notes: string;
  createdAt: string;
}

interface ChartComponentProps {
  transactions: Transaction[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ transactions }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [timeFrame, setTimeFrame] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    if (transactions.length === 0) {
      setChartData([]);
      return;
    }

    // Process data based on selected timeframe
    if (timeFrame === 'monthly') {
      const last6Months = getLastNMonths(6);
      const monthlyData = last6Months.map(month => {
        const monthTransactions = transactions.filter(t => {
          const transDate = new Date(t.date);
          return transDate.getMonth() === month.monthIndex && 
                 transDate.getFullYear() === month.year;
        });

        const incomeTotal = monthTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);

        const expenseTotal = monthTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          name: month.label,
          income: incomeTotal,
          expenses: expenseTotal,
          balance: incomeTotal - expenseTotal
        };
      });

      setChartData(monthlyData);
    } else {
      // Yearly data processing would go here
      const yearlyData = getLastNYears(3).map(year => {
        const yearTransactions = transactions.filter(t => {
          const transDate = new Date(t.date);
          return transDate.getFullYear() === year.year;
        });

        const incomeTotal = yearTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);

        const expenseTotal = yearTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          name: year.label,
          income: incomeTotal,
          expenses: expenseTotal,
          balance: incomeTotal - expenseTotal
        };
      });

      setChartData(yearlyData);
    }
  }, [transactions, timeFrame]);

  // Helper function to get last N months
  const getLastNMonths = (n: number) => {
    const months = [];
    const today = new Date();
    
    for (let i = 0; i < n; i++) {
      const d = new Date();
      d.setMonth(today.getMonth() - i);
      
      months.unshift({
        monthIndex: d.getMonth(),
        year: d.getFullYear(),
        label: d.toLocaleString('default', { month: 'short', year: 'numeric' })
      });
    }
    
    return months;
  };

  // Helper function to get last N years
  const getLastNYears = (n: number) => {
    const years = [];
    const currentYear = new Date().getFullYear();
    
    for (let i = 0; i < n; i++) {
      const year = currentYear - i;
      years.unshift({
        year,
        label: year.toString()
      });
    }
    
    return years;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="chart-component">
      <div className="chart-header">
        <h3>Income vs Expenses</h3>
        <div className="chart-controls">
          <button 
            className={`chart-control-btn ${timeFrame === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeFrame('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`chart-control-btn ${timeFrame === 'yearly' ? 'active' : ''}`}
            onClick={() => setTimeFrame('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        {chartData.length === 0 ? (
          <div className="chart-placeholder">
            <p>Add transactions to see your financial chart</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#4caf50" />
              <Bar dataKey="expenses" name="Expenses" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
