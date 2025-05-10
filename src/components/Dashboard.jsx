import { useContext } from 'react';
import AuthContext from '../context/AuthProvider.jsx';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);

  const getWelcomeMessage = () => {
    switch (auth.role) {
      case 'introducer':
        return '🚀 Hi, ready to submit new opportunities?';
      case 'capital_partner':
        return '💼 Hi, explore the latest curated deals!';
      case 'admin':
        return '🛠️ Hi, manage users and deals from the control center.';
      default:
        return '👋 Welcome!';
    }
  };

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Welcome, {auth.user}!</p>
      <h2>{getWelcomeMessage()}</h2>

      {auth.role === 'introducer' && (
        <div>
          <h3>Introducer Portal</h3>
          <p>Submit and track your investment opportunities here.</p>
        </div>
      )}

      {auth.role === 'capital_partner' && (
        <div>
          <h3>Capital Partner Portal</h3>
          <p>Browse opportunities and connect with introducers.</p>
        </div>
      )}

      {auth.role === 'admin' && (
        <div>
          <h3>Admin Control Center</h3>
          <p>Oversee users, deals, and platform settings.</p>
        </div>
      )}
    </section>
  );
};

export default Dashboard;