import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './Login.css';

const ResetPassword = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('/auth/reset-password', {
        email,
        newPassword
      });

      setMessage(response.data.message);
      setTimeout(() => navigate(`/login/${role}`), 2000); // redirect back to login
    } catch (err) {
      setError(err.response?.data?.error || 'Reset failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textTransform: 'capitalize' }}>Reset Password ({role})</h2>
      <form onSubmit={handleReset}>
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>New Password:</label>
        <input
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;