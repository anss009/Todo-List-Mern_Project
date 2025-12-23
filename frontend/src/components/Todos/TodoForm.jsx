import { useState } from 'react';
import axios from 'axios';

function TodoForm({ onTodoAdded }) {
  // State for form inputs
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '' 
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create new todo
      await axios.post('http://localhost:5000/api/todos', formData);
      
      // Clear form
      setFormData({ title: '', description: '' });
      
      // Tell parent to refresh the list
      onTodoAdded();
    } catch (err) {
      alert('Failed to add todo');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      border: '2px solid #ddd', 
      padding: '20px', 
      borderRadius: '8px', 
      backgroundColor: '#f9f9f9' 
    }}>
      <h3>Add New Todo</h3>
      <input
        type="text"
        placeholder="Todo Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        style={{ 
          width: '100%', 
          padding: '10px', 
          marginBottom: '10px', 
          border: '1px solid #ddd', 
          borderRadius: '4px' 
        }}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        style={{ 
          width: '100%', 
          padding: '10px', 
          marginBottom: '10px', 
          border: '1px solid #ddd', 
          borderRadius: '4px', 
          minHeight: '80px' 
        }}
      />
      <button type="submit" style={{ 
        padding: '10px 20px', 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer' 
      }}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;