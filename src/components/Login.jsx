import { useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import './Login.css';

const Login = () => {
  const { role } = useParams();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      });

      const userRole = response.data.role;

      if (userRole !== role) {
        setError(`Please log in through the correct ${userRole} portal.`);
        return;
      }

      setAuth({
        token: response.data.token,
        role: userRole,
        user: response.data.id
      });

      switch (userRole) {
        case 'introducer':
          navigate('/introducer-dashboard');
          break;
        case 'partner':
          navigate('/capital-partner-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textTransform: 'capitalize' }}>Login as {role}</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to={`/reset-password/${role}`}>Forgot your password?</Link>
      </div>
    </div>
  );
};

export default Login;