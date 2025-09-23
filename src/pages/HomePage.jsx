// src/pages/HomePage.jsx
import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

/** Small helper: a card with a "Read more" toggle */
function ExpandableCard({ img, title, teaser, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card">
      <img src={img} alt={title} />
      <h4>{title}</h4>
      <p>{teaser}</p>
      <button
        className="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${title.replace(/\s+/g, '-').toLowerCase()}-more`}
      >
        {open ? 'Hide details' : 'Read more'}
      </button>

      <div
        id={`${title.replace(/\s+/g, '-').toLowerCase()}-more`}
        className={`card-more ${open ? 'open' : ''}`}
      >
        {children}
      </div>
    </div>
  );
}

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Header Navigation */}
      <header className="header">
        <div className="main-container header-inner">
          {/* Left: Logo */}
          <div className="logo">
            <span>Newlink Exchange</span>
            <span className="swiss-badge">🇨🇭 Switzerland</span>
          </div>

          {/* Center: Desktop nav (centered via CSS) */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              <li><a href="#channels">Channels</a></li>
              <li><a href="#connect">Connect</a></li>
              <li><a href="#contact">Contact</a></li>
              {/* Dashboard temporarily routes to Connect */}
              <li><a href="#connect">Dashboard</a></li>
            </ul>
          </nav>

          {/* Right: Contact email (hidden on small screens) */}
          <div className="contact-email">📧 info@swiss-starter.ch</div>

          {/* Mobile menu button */}
          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="menu-bar" />
            <span className="menu-bar" />
            <span className="menu-bar" />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`nav-drawer ${menuOpen ? 'open' : ''}`}>
          <a href="#channels" onClick={() => setMenuOpen(false)}>Channels</a>
          <a href="#connect" onClick={() => setMenuOpen(false)}>Connect</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          {/* Dashboard → Connect on mobile too */}
          <a href="#connect" onClick={() => setMenuOpen(false)}>Dashboard</a>
        </div>
      </header>

      {/* Hero Section (image set in CSS as /images/hero-ch.jpg) */}
      <section className="header-section">
        <div className="main-container">
          <div className="header-content">
            <h1 className="section-title">Exchange Channels</h1>
            <h3 className="section-subtitle">
              Empowering Introducers and Capital Partners — Switzerland
            </h3>
            <p className="section-description">
              Newlink Exchange connects introducers with financial partners seamlessly.
              Experience secure messaging, a deal room, and compliance-focused features —
              all with Swiss quality and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Channels Section */}
      <section className="section" id="channels">
        <div className="main-container card-row">
          {/* Real Estate */}
          <ExpandableCard
            img="/images/real-estate.jpeg"
            title="Real Estate"
            teaser="Institutional property and development capital"
          >
            <p>
              <strong>Prime assets. Discreet placements.</strong> We introduce
              <strong> owners and developers</strong> of core/core-plus
              <strong> residential & commercial</strong> assets to qualified
              <strong> family offices</strong> and cross-border buyers.
            </p>
            <ul>
              <li><strong>Scope:</strong> Switzerland & EU; income-producing assets, development finance, off-market mandates.</li>
              <li><strong>Process:</strong> NDA, structured teaser, curated outreach, data room, term negotiation.</li>
              <li><strong>Outcome:</strong> verified interest, comparable guidance, coordinated diligence through closing.</li>
            </ul>
          </ExpandableCard>

          {/* Private Equity */}
          <ExpandableCard
            img="/images/private-equity.png"
            title="Private Equity"
            teaser="Growth capital, buyout & succession"
          >
            <p>
              <strong>Growth, buyout & succession capital.</strong> We match
              <strong> startups and SMEs</strong> with <strong>VC, PE and private investors</strong>
              for minority or majority deals.
            </p>
            <ul>
              <li><strong>Instruments:</strong> equity, convertible, growth capital, MBO/MBI, carve-outs, roll-ups.</li>
              <li><strong>Process:</strong> screening, concise teaser, investor fit, introduction, data room, diligence.</li>
              <li><strong>Focus:</strong> sector-led outreach with clear governance and execution timelines.</li>
            </ul>
          </ExpandableCard>

          {/* Wealth Management */}
          <ExpandableCard
            img="/images/wealth.jpeg"
            title="Wealth Management"
            teaser="Private offices & institutional discipline"
          >
            <p>
              <strong>Private offices & institutional discipline.</strong> We introduce
              <strong> HNW individuals and companies</strong> to Swiss
              <strong> private offices and asset managers</strong> for discretionary portfolios
              and treasury solutions.
            </p>
            <ul>
              <li><strong>Solutions:</strong> multi-asset mandates, liquidity management, alternatives, custody in Switzerland.</li>
              <li><strong>Compliance:</strong> suitability, KYC/AML and cross-border rules built into the process.</li>
              <li><strong>Flow:</strong> discovery → curated shortlist → introductions → onboarding with your chosen manager.</li>
            </ul>
          </ExpandableCard>
        </div>
      </section>

      {/* Connect Section */}
      <section className="section alt" id="connect">
        <div className="main-container">
          <h2 className="section-title blue">Connect and thrive</h2>
          <h3 className="section-subtitle">Empowering business introducers</h3>
          <p className="section-description">
            Seamlessly connect with industry leaders and expand your reach. Our platform
            empowers business introducers to thrive in private equity, wealth management,
            and real estate.
          </p>

          <div className="card-row">
            <div className="card round">
              <img className="circle" src="/images/introducers.jpg" alt="Business Introducers" />
              <h4>Business Introducers</h4>
              <p>Manage your business connections with our user-friendly dashboard.</p>
              <Link to="/login/introducer"><button className="button">Go to Introducer Login</button></Link>
            </div>

            <div className="card round">
              <img className="circle" src="/images/capital-partners.jpg" alt="Capital Partners" />
              <h4>Capital Partners</h4>
              <p>Collaborate with partners and discover opportunities.</p>
              <Link to="/login/partner"><button className="button">Go to Partner Login</button></Link>
            </div>

            <div className="card round">
              <img className="circle" src="/images/admin.jpg" alt="Admin Panel" />
              <h4>Admin control center</h4>
              <p>Control panels for administrators</p>
              <Link to="/login/admin"><button className="button">Go to Admin Login</button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <p>© 2025 Swiss Starter. All rights reserved.</p>
        <p className="footer-note">Operations hub: Switzerland</p>
        <p className="footer-note">info@swiss-starter.ch</p>
      </footer>
    </div>
  );
};

export default HomePage;
