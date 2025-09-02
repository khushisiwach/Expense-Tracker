import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Helper to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const features = [
  { title: 'Track Expenses', desc: 'Effortlessly log and categorize your spending with a clean, intuitive interface.' },
  { title: 'Track Income', desc: 'Keep a clear record of all your earnings, from salary to side gigs.' },
  { title: 'Charts & Reports', desc: 'Visualize your financial health with vibrant, dynamic charts and reports.' },
];

const Home = () => {
  const navigate = useNavigate();
  const [heroAnimate, setHeroAnimate] = useState(false);
  const [featuresAnimate, setFeaturesAnimate] = useState(false);

  useEffect(() => {
    const heroTimer = setTimeout(() => setHeroAnimate(true), 100);
    const featuresTimer = setTimeout(() => setFeaturesAnimate(true), 500);

    return () => {
      clearTimeout(heroTimer);
      clearTimeout(featuresTimer);
    };
  }, []);


  const handleGetStarted = () => {
    navigate('/login');
  };

  // Auth check using cookie
  const isAuthenticated = !!getCookie('token');

  const handleCardClick = (link) => {
    if (isAuthenticated) {
      navigate(link);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      {/* Floating bubbles */}
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>

      <div className="content-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className={`hero-content ${heroAnimate ? 'active' : ''}`}>
            <h1 className="hero-title">Expense Tracker</h1>
            <p className="hero-description">
              Take control of your financial journey. A simple, elegant tool designed to make finance management feel soft and seamless.
            </p>
            <button onClick={handleGetStarted} className="get-started-btn">
              Start Tracking Now
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className={`features-section ${featuresAnimate ? 'active' : ''}`}>
          <div className="feature-card">
            <h3 className="feature-card-title">Track Expenses</h3>
            <p className="feature-card-desc">Effortlessly log and categorize your spending with a clean, intuitive interface.</p>
            <button onClick={() => handleCardClick('/expense')} className="feature-card-btn">Go to Expense</button>
          </div>
          <div className="feature-card">
            <h3 className="feature-card-title">Track Income</h3>
            <p className="feature-card-desc">Keep a clear record of all your earnings, from salary to side gigs.</p>
            <button onClick={() => handleCardClick('/income')} className="feature-card-btn">Go to Income</button>
          </div>
          <div className="feature-card">
            <h3 className="feature-card-title">Charts & Reports</h3>
            <p className="feature-card-desc">Visualize your financial health with vibrant, dynamic charts and reports.</p>
            <button onClick={() => handleCardClick('/dashboard')} className="feature-card-btn">Go to Dashboard</button>
          </div>
        </section>

      </div>
       <div className="footer">
        <footer>
          &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </footer>
        </div>
    </div>
  );
};

export default Home;
