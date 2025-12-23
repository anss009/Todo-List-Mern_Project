import { useState } from 'react';
import axios from 'axios';

function TodoItem({ todo, onTodoUpdated }) {
  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState(false);
  
  // State for edit form
  const [editData, setEditData] = useState({ 
    title: todo.title, 
    description: todo.description 
  });

  // Update todo
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, editData);
      setIsEditing(false);
      onTodoUpdated();  // Refresh list
    } catch (err) {
      alert('Failed to update todo');
    }
  };

  // Delete todo
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
        onTodoUpdated();  // Refresh list
      } catch (err) {
        alert('Failed to delete todo');
      }
    }
  };

  // Toggle status between pending/completed
  const toggleStatus = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, {
        status: todo.status === 'pending' ? 'completed' : 'pending'
      });
      onTodoUpdated();  // Refresh list
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // If in edit mode, show edit form
  if (isEditing) {
    return (
      <div style={{ 
        border: '2px solid #2196F3', 
        padding: '15px', 
        marginBottom: '15px', 
        borderRadius: '8px', 
        backgroundColor: '#e3f2fd' 
      }}>
        <input
          value={editData.title}
          onChange={(e) => setEditData({...editData, title: e.target.value})}
          style={{ 
            width: '100%', 
            padding: '8px', 
            marginBottom: '8px', 
            border: '1px solid #ddd', 
            borderRadius: '4px' 
          }}
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({...editData, description: e.target.value})}
          style={{ 
            width: '100%', 
            padding: '8px', 
            marginBottom: '8px', 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            minHeight: '60px' 
          }}
        />
        <button onClick={handleUpdate} style={{ 
          padding: '8px 15px', 
          marginRight: '10px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}>
          Save
        </button>
        <button onClick={() => setIsEditing(false)} style={{ 
          padding: '8px 15px', 
          backgroundColor: '#999', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}>
          Cancel
        </button>
      </div>
    );
  }

  // Normal view mode
  return (
    <div style={{ 
      border: '2px solid #ddd', 
      padding: '15px', 
      marginBottom: '15px',
      borderRadius: '8px',
      backgroundColor: todo.status === 'completed' ? '#e8f5e9' : '#fff',
      textDecoration: todo.status === 'completed' ? 'line-through' : 'none'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>{todo.title}</h3>
      <p style={{ color: '#666', margin: '0 0 10px 0' }}>{todo.description}</p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ 
          padding: '4px 12px', 
          backgroundColor: todo.status === 'completed' ? '#4CAF50' : '#FF9800',
          color: 'white',
          borderRadius: '12px',
          fontSize: '12px'
        }}>
          {todo.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
        </span>
        <button onClick={toggleStatus} style={{ 
          padding: '8px 15px', 
          backgroundColor: '#2196F3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}>
          {todo.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        <button onClick={() => setIsEditing(true)} style={{ 
          padding: '8px 15px', 
          backgroundColor: '#FF9800', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}>
          Edit
        </button>
        <button onClick={handleDelete} style={{ 
          padding: '8px 15px', 
          backgroundColor: '#f44336', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;