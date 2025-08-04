import React from 'react';
import './HowThisWorks.css';
import step1 from '../assets/step1.png'; // Placeholder PNG
import step2 from '../assets/step2.png';
import step3 from '../assets/step3.png';

function HowThisWorks() {
  return (
    <section className="how-section" id="how">
      <h2 className="how-title">Remove backgrounds in 3 easy steps</h2>
      <div className="how-steps">
        <div className="how-step">
          <img src={step1} alt="Step 1" className="how-step-img" />
          <h3>Step 1</h3>
          <p>Choose a photo to get started. Upload your image — JPG or PNG, any size works.</p>
        </div>
        <div className="how-step">
          <img src={step2} alt="Step 2" className="how-step-img" />
          <h3>Step 2</h3>
          <p>Let our AI do the work. We instantly remove the background for you.</p>
        </div>
        <div className="how-step">
          <img src={step3} alt="Step 3" className="how-step-img" />
          <h3>Step 3</h3>
          <p>Download and use your new image. Transparent PNG, ready to use anywhere.</p>
        </div>
      </div>
    </section>
  );
}

export default HowThisWorks;
