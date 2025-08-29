import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <div className="footer">
        <footer>
          &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
