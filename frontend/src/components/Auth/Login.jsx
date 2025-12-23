import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  // Form state
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  
  // Get login function from context
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
      navigate('/todos');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
        <button type="submit" style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#2196F3', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer' 
        }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;