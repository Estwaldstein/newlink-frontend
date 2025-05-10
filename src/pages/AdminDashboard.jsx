import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    try {
      const response = await axios.get('/deals/list', {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setDeals(response.data);
    } catch (error) {
      console.error('❌ Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (dealId, newStatus) => {
    try {
      await axios.post(
        `/deals/status/${dealId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${auth.token}` }
        }
      );
      fetchDeals(); // Refresh after update
    } catch (error) {
      console.error('❌ Error updating status:', error);
    }
  };

  const handleLogout = () => {
  setAuth({});
  localStorage.removeItem('auth');
  window.location.href = '/';
};

  useEffect(() => {
    fetchDeals();
  }, []);

  if (loading) return <p>Loading deals...</p>;

  return (
    <section>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <h1>Admin Dashboard</h1>
      <p>Manage all submitted deals.</p>

      {deals.length === 0 ? (
        <p>No deals available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Sector</th>
              <th>Introducer Email</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal._id}>
                <td>{deal.title}</td>
                <td>{deal.description}</td>
                <td>{deal.sector}</td>
                <td>{deal.submittedBy?.email || 'Unknown'}</td>
                <td>{deal.status}</td>
                <td>
                  <select
                    value={deal.status}
                    onChange={(e) => updateStatus(deal._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="archived">Archived</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AdminDashboard;
