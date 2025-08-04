import React from 'react';
import './Header.css';
import logo from '../assets/random-logo.png'; // Replace with your actual logo
import support from '../assets/hero-support.png';
function Header({ onStartRemoving }) {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="openbg logo" className="header-logo" />
        <span className="header-brand">openbg</span>
      </div>
      <nav className="header-nav">
        <a href="#how" className="header-link">How it works</a>
        <a href="#features" className="header-link">Features</a>
        <button className="header-cta" onClick={onStartRemoving}>
          Start Removing
        </button>
      </nav>
    </header>
  );
}

export default Header;
