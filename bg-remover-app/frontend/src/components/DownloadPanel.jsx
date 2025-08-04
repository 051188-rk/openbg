import React, { useState } from 'react';
import './DownloadPanel.css';
import ImageUploader from './ImageUploader';
import downloadImg from '../assets/download-panel.png';

function DownloadPanel() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProcess = async (file) => {
    setLoading(true);
    setImages(null);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('http://127.0.0.1:5000/remove-bg', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setImages(data);
    } catch (err) {
      alert('Error processing image');
    }
    setLoading(false);
  };

  return (
    <section className="download-section" id="download">
      <div className="download-panel">
        <div className="download-left">
          <h2>Remove your image background</h2>
          <p>Upload a photo and get a transparent PNG in seconds.</p>
          <ImageUploader onProcess={handleProcess} images={images} loading={loading} />
        </div>
        <div className="download-right">
          <img src={downloadImg} alt="Download preview" className="download-img" />
        </div>
      </div>
    </section>
  );
}

export default DownloadPanel;
