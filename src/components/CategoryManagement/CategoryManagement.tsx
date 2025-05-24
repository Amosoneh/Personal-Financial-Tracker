import React, { useState } from 'react';
import './CategoryManagement.css';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface CategoryManagementProps {
  onSave: (categories: Category[]) => void;
  onCancel: () => void;
  initialCategories: Category[];
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ 
  onSave, 
  onCancel, 
  initialCategories 
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [newCategoryType, setNewCategoryType] = useState<'income' | 'expense'>('expense');

  const addCategory = () => {
    if (!newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      type: newCategoryType
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleSave = () => {
    onSave(categories);
  };

  return (
    <div className="category-management">
      <h2>Manage Categories</h2>
      
      <div className="add-category-form">
        <div className="form-row">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name"
            className="category-input"
          />
          
          <select
            value={newCategoryType}
            onChange={(e) => setNewCategoryType(e.target.value as 'income' | 'expense')}
            className="category-type-select"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          
          <button 
            onClick={addCategory}
            className="btn add-category"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="categories-container">
        <div className="category-section">
          <h3>Income Categories</h3>
          <ul className="category-list">
            {categories.filter(cat => cat.type === 'income').length === 0 ? (
              <li className="empty-category">No income categories</li>
            ) : (
              categories
                .filter(cat => cat.type === 'income')
                .map(category => (
                  <li key={category.id} className="category-item">
                    <span>{category.name}</span>
                    <button 
                      onClick={() => removeCategory(category.id)}
                      className="btn remove-category"
                    >
                      Remove
                    </button>
                  </li>
                ))
            )}
          </ul>
        </div>
        
        <div className="category-section">
          <h3>Expense Categories</h3>
          <ul className="category-list">
            {categories.filter(cat => cat.type === 'expense').length === 0 ? (
              <li className="empty-category">No expense categories</li>
            ) : (
              categories
                .filter(cat => cat.type === 'expense')
                .map(category => (
                  <li key={category.id} className="category-item">
                    <span>{category.name}</span>
                    <button 
                      onClick={() => removeCategory(category.id)}
                      className="btn remove-category"
                    >
                      Remove
                    </button>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>
      
      <div className="form-actions">
        <button onClick={onCancel} className="btn cancel">
          Cancel
        </button>
        <button onClick={handleSave} className="btn primary">
          Save Categories
        </button>
      </div>
    </div>
  );
};

export default CategoryManagement;
