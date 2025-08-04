import React from 'react';
import './Features.css';
import feature1 from '../assets/feature1.png';
import feature2 from '../assets/feature2.png';

function Features() {
  return (
    <section className="features-section" id="features">
      <h2 className="features-title">Why choose openbg?</h2>
      <div className="features-list">
        <div className="feature-card">
          <img src={feature1} alt="Private" className="feature-img" />
          <h3>Private & Secure</h3>
          <p>All processing is local. Your images never leave your device.</p>
        </div>
        <div className="feature-card">
          <img src={feature2} alt="Fast" className="feature-img" />
          <h3>Fast & Free</h3>
          <p>Backgrounds removed in seconds. No sign-up required.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
