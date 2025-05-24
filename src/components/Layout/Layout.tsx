import React, { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>Personal Finance Tracker</h1>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Personal Finance Tracker</p>
      </footer>
    </div>
  );
};

export default Layout;
