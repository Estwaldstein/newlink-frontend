import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './context/AuthProvider';

import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';

import IntroducerDashboard from './pages/IntroducerDashboard';
import CapitalPartnerDashboard from './pages/CapitalPartnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';

const App = () => {
  const { auth } = useContext(AuthContext);

  const getDashboardPath = () => {
    if (!auth?.role) return '/login/introducer';

    switch (auth.role) {
      case 'introducer':
        return '/introducer-dashboard';
      case 'partner':
        return '/capital-partner-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/login/introducer';
    }
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login/:role" element={<Login />} />
      <Route path="/reset-password/:role" element={<ResetPassword />} />

      <Route
        path="/introducer-dashboard"
        element={
          <PrivateRoute role="introducer">
            <IntroducerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/capital-partner-dashboard"
        element={
          <PrivateRoute role="partner">
            <CapitalPartnerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;