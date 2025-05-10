import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CapitalPartnerDashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get('/deals/list', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setDeals(response.data);
      } catch (err) {
        console.error('❌ Failed to fetch deals:', err);
      }
    };

    fetchDeals();
  }, [auth.token]);

  const handleLogout = () => {
    setAuth({});
    navigate('/login');
  };

  const expressInterest = async (dealId) => {
    try {
      await axios.post(`/deals/interest/${dealId}`, {}, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      const refreshed = await axios.get('/deals/list', {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setDeals(refreshed.data);
    } catch (err) {
      console.error('❌ Failed to express interest:', err);
    }
  };

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Capital Partner Dashboard</h1>
        <button onClick={handleLogout} style={{ height: '40px' }}>Logout</button>
      </div>
      <p>Explore the latest curated deals and opportunities.</p>

      {deals.length === 0 ? (
        <p>No deals available at the moment.</p>
      ) : (
        <ul>
          {deals.map((deal) => (
            <li key={deal._id} style={{ border: '1px solid #ccc', margin: '20px 0', padding: '20px' }}>
              <h3>{deal.title}</h3>
              <p><strong>Sector:</strong> {deal.sector || '—'}</p>
              <p>{deal.description || '—'}</p>
              <p><strong>Value:</strong> {deal.value ? `${deal.currency || ''} ${deal.value.toLocaleString()}` : '—'}</p>
              <p><strong>Country:</strong> {deal.country || '—'}</p>

              <p><strong>Documents:</strong></p>
              {deal.documents && deal.documents.length > 0 ? (
                <ul>
                  {deal.documents.map((filename, index) => {
                    const parts = filename.split('-');
                    const displayName = parts.length > 1 ? parts.slice(1).join('-') : filename;

                    return (
                      <li key={index}>
                        <a
                          href={`https://api.exchange.newlink-asia.com/uploads/${filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          {displayName}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>None</p>
              )}

              <p><em>Submitted: {new Date(deal.createdAt).toLocaleDateString()}</em></p>

              {deal.interestedPartners.includes(auth.id) ? (
                <button disabled>✅ Interest Expressed</button>
              ) : (
                <button onClick={() => expressInterest(deal._id)}>Express Interest</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CapitalPartnerDashboard;
