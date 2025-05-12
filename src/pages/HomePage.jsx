import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Header Navigation */}
      <header className="header">
        <div className="main-container header-inner">
          <div className="logo">Newlink Exchange</div>
          <nav>
            <ul className="nav-links">
              <li><a href="#channels">Channels</a></li>
              <li><a href="#connect">Connect</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><Link to="/login">Dashboard</Link></li>
            </ul>
          </nav>
         <div className="contact-email">📧 info@newlink-asia.com</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="header-section">
        <div className="main-container">
          <div className="header-content">
            <h1 className="section-title">Exchange Channels</h1>
            <h3 className="section-subtitle">Empowering Introducers and Capital Partners</h3>
            <p className="section-description">
              Newlink Exchange connects introducers with financial partners seamlessly. Experience secure messaging, a deal room, and compliance-focused features all in one platform.
            </p>
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section className="section" id="channels">
        <div className="main-container card-row">
          <div className="card">
            <img src="/images/real-estate.jpeg" alt="Real Estate" />
            <h4>Real Estate</h4>
            <p>Institutional property and development capital</p>
            <button>Read more</button>
          </div>
          <div className="card">
            <img src="/images/private-equity.png" alt="Private Equity" />
            <h4>Private Equity</h4>
            <p>Growth capital, succession, and buyout opportunities</p>
            <button>Read more</button>
          </div>
          <div className="card">
            <img src="/images/wealth.jpeg" alt="Wealth Management" />
            <h4>Wealth Management</h4>
            <p>Stay compliant effortlessly with our management system</p>
            <button>Read more</button>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="section alt" id="connect">
        <div className="main-container">
          <h2 className="section-title blue">Connect and thrive</h2>
          <h3 className="section-subtitle">Empowering business introducers</h3>
          <p className="section-description">
            Seamlessly connect with industry leaders and expand your reach. Our platform empowers business introducers to thrive in private equity, wealth management, and real estate.
          </p>
          <div className="card-row">
            <div className="card round">
              <img className="circle" src="/images/introducers.jpg" alt="Business Introducers" />
              <h4>Business Introducers</h4>
              <p>Manage your business connections with our user-friendly dashboard.</p>
              <Link to="/login/introducer">
                <button>Go to Introducer Login</button>
              </Link>
            </div>
            <div className="card round">
              <img className="circle" src="/images/capital-partners.jpg" alt="Capital Partners" />
              <h4>Capital Partners</h4>
              <p>Collaborate with partners and discover opportunities.</p>
              <Link to="/login/partner">
                <button>Go to Partner Login</button>
              </Link>
            </div>
            <div className="card round">
              <img className="circle" src="/images/admin.jpg" alt="Admin Panel" />
              <h4>Admin control center</h4>
              <p>Control panels for administrators</p>
              <Link to="/login/admin">
                <button>Go to Admin Login</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <p>© 2025 Newlink Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
