// Import routing components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

// Import our components
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import TodoList from './components/Todos/Todolist';

// Protected Route component - redirects to login if not authenticated
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  
  // If user has token, show the component
  // If no token, redirect to login page
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    // Wrap entire app in AuthProvider so all components can access auth state
    <AuthProvider>
      {/* Set up routing */}
      <BrowserRouter>
        <Routes>
          {/* Public routes - anyone can access */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected route - only logged-in users can access */}
          <Route 
            path="/todos" 
            element={
              <PrivateRoute>
                <TodoList />
              </PrivateRoute>
            } 
          />
          
          {/* Default route - redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;