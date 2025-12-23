import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

function TodoList() {
  // State to store all todos
  const [todos, setTodos] = useState([]);
  
  // Get logout function and user info from context
  const { logout, user } = useContext(AuthContext);

  // Function to fetch all todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch todos when component loads
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '15px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h2>My Todo List</h2>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {user?.name}!</span>
          <button onClick={logout} style={{ 
            padding: '8px 15px', 
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}>
            Logout
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
        {/* Form to add new todo */}
        <TodoForm onTodoAdded={fetchTodos} />
        
        {/* List of todos */}
        <div style={{ marginTop: '30px' }}>
          {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>
              No todos yet. Add one above!
            </p>
          ) : (
            todos.map(todo => (
              <TodoItem 
                key={todo._id} 
                todo={todo} 
                onTodoUpdated={fetchTodos} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;