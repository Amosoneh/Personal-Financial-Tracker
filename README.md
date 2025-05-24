# Personal Finance Tracker

A comprehensive web application for tracking personal finances, enabling users to monitor and analyze their income and expenses with categorization and filtering options.

## Features

### Core Features
- **Income and Expense Tracking**: Easily record financial transactions with detailed information
- **Custom Categories**: Create and manage your own income and expense categories
- **Transaction Management**: Sort and filter transactions by date, category, and amount
- **Data Visualization**: View your financial data through interactive charts
- **CSV Export**: Export your transaction data for use in spreadsheet applications
- **Data Persistence**: All your data is automatically saved in your browser's local storage

### Technical Features
- Built with React and TypeScript for robust, type-safe code
- Responsive design for optimal usability on all device sizes
- Uses Recharts for interactive data visualization
- Browser-based storage for data persistence without server requirements

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or download the source code
```
git clone https://github.com/amosoneh/personal-finance-tracker.git
```

2. Navigate to the project directory
```
cd personal-finance-tracker
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage Guide

### Adding Transactions
1. Click the "Add Income" or "Add Expense" button on the dashboard
2. Fill in the required fields:
   - Amount: The transaction amount
   - Category: Select from the dropdown or create custom categories
   - Date: When the transaction occurred
   - Notes (optional): Any additional details
3. Click "Save" to record the transaction

### Managing Categories
1. Click the "Manage Categories" button on the dashboard
2. Add new categories by entering a name and selecting the type (income or expense)
3. Remove existing categories using the "Remove" button
4. Click "Save Categories" when finished

### Viewing and Filtering Transactions
1. The Transactions section displays all recorded transactions
2. Use the filter controls to:
   - Filter by type (income, expense, or all)
   - Filter by category
3. Click on column headers to sort by:
   - Date
   - Type
   - Category
   - Amount

### Visualizing Your Finances
1. The chart section displays your income vs expenses
2. Toggle between monthly and yearly views
3. Hover over chart elements to see detailed information

### Exporting Data
1. Scroll to the CSV Export section
2. Click "Export Transactions to CSV"
3. The file will download automatically and can be opened in any spreadsheet application

### Data Management
- All data is automatically saved in your browser's local storage
- Use the "Reset All Data" button at the bottom of the page to clear all data (use with caution)

## Browser Compatibility

The Personal Finance Tracker is compatible with all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Privacy

All your financial data is stored locally in your browser's storage. No data is sent to any server, ensuring complete privacy of your financial information.

## Development

### Project Structure
- `src/components/`: Contains all React components
- `src/App.tsx`: Main application component
- `src/index.tsx`: Application entry point

### Available Scripts
- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Built with [Create React App](https://create-react-app.dev/)
- Charts powered by [Recharts](https://recharts.org/)
