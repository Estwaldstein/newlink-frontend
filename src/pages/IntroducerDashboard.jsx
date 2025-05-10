import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const IntroducerDashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sector: 'private_equity',
    documents: null,
    currency: '',
    value: '',
    country: ''
  });

  const fetchDeals = async () => {
    try {
      const response = await axios.get('/deals/list', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setDeals(response.data);
    } catch (error) {
      console.error('❌ Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem('auth');
    navigate('/');
  };

  const handleChange = (e) => {
    if (e.target.name === 'documents') {
      setFormData({ ...formData, documents: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('sector', formData.sector);
    if (formData.documents) payload.append('documents', formData.documents);
    if (formData.currency) payload.append('currency', formData.currency);
    if (formData.value) payload.append('value', formData.value);
    if (formData.country) payload.append('country', formData.country);

    try {
      await axios.post('/deals/submit', payload, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('✅ Deal submitted successfully!');
      setFormData({
        title: '',
        description: '',
        sector: 'private_equity',
        documents: null,
        currency: '',
        value: '',
        country: ''
      });
      fetchDeals();
    } catch (error) {
      console.error('❌ Error submitting deal:', error);
      setMessage('❌ Failed to submit deal.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
      {/* Left: Submission Form */}
      <div style={{ flex: 1, marginRight: '40px' }}>
        <h1>Introducer Dashboard</h1>

        <h2>Submit a New Deal</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Title:<br />
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </label><br /><br />

          <label>Description:<br />
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label><br /><br />

          <label>Sector:<br />
            <select name="sector" value={formData.sector} onChange={handleChange}>
              <option value="private_equity">Private Equity</option>
              <option value="wealth_management">Wealth Management</option>
              <option value="real_estate">Real Estate</option>
            </select>
          </label><br /><br />

          <label>Currency (optional):<br />
            <select name="currency" value={formData.currency} onChange={handleChange}>
              <option value="">-- Select Currency --</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
	      <option value="CHF">CHF</option>
	      <option value="SGD">SGD</option>
	      <option value="HKD">HKD</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
            </select>
          </label><br /><br />

          <label>Value (optional):<br />
            <input type="number" step="0.01" name="value" value={formData.value} onChange={handleChange} />
          </label><br /><br />

          <label>Country (optional):<br />
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
          </label><br /><br />

          <label>Upload Document (optional):<br />
            <input type="file" name="documents" onChange={handleChange} />
          </label><br /><br />

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Deal'}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>

      {/* Right: List of Previous Deals */}
      <div style={{ flex: 1 }}>
        <h2>Your Submitted Deals</h2>
        {loading ? (
          <p>Loading deals...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {deals.map((deal) => (
              <li key={deal._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
                <strong>{deal.title}</strong>
                <p><em>Submitted: {new Date(deal.createdAt).toLocaleDateString()}</em></p>
                <p><b>Status:</b> {deal.status}</p>
                {deal.currency && deal.value && (
                  <p><b>Deal Size:</b> {deal.currency} {Number(deal.value).toLocaleString()}</p>
                )}
                {deal.country && <p><b>Country:</b> {deal.country}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logout Button */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
  );
};

export default IntroducerDashboard;
