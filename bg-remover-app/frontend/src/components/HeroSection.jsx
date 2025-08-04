import React from 'react';
import './HeroSection.css';
import heroMain from '../assets/hero-main.png'; // Large PNG placeholder
import logo from '../assets/logo-accent.png'; // Accent PNG placeholder
import support from '../assets/hero-support.png';

function HeroSection({ onGetStarted }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Remove Backgrounds Instantly</h1>
        <p className="hero-desc">Effortlessly erase backgrounds from your photos. Fast, private, and free. Perfect for profile pics, products, and more.</p>
        <a href="/editor" className="hero-btn">Get Started</a>
        <img src={support} alt="Support" className="hero-support" />
      </div>
      <div className="hero-images">
        <img src={heroMain} alt="Main hero visual" className="hero-image-main" />
        <img src={logo} alt="Accent design" className="hero-image-accent" />
      </div>
    </section>
  );
}

export default HeroSection;
