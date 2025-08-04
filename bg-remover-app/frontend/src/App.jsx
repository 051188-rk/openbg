
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowThisWorks from './components/HowThisWorks';
import Features from './components/Features';
import DownloadPanel from './components/DownloadPanel';
import Footer from './components/Footer';
import './App.css';



import React, { useRef } from 'react';

function App() {
  const uploaderRef = useRef(null);
  const scrollToUploader = () => {
    if (uploaderRef.current) {
      uploaderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <Header onStartRemoving={scrollToUploader} />
      <HeroSection onGetStarted={scrollToUploader} />
      <HowThisWorks />
      <Features />
      <DownloadPanel ref={uploaderRef} />
      <Footer />
    </div>
  );
}




export default App;
