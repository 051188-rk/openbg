import React, { useState } from 'react';
import './ImageEditorPage.css';
import ImageUploader from './ImageUploader';

const presetBackgrounds = [
  { name: 'Transparent', value: null },
  { name: 'White', value: '#fff' },
  { name: 'Black', value: '#111' },
  { name: 'Sky', value: 'sky.png' }, // placeholder
  { name: 'Gradient', value: 'gradient.png' }, // placeholder
];

function ImageEditorPage() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedBg, setSelectedBg] = useState(null);
  const [userBg, setUserBg] = useState(null);

  const handleProcess = async (file) => {
    setLoading(true);
    setImages(null);
    const formData = new FormData();
    formData.append('image', file);
    // Optionally send background info
    if (selectedBg) formData.append('background', selectedBg);
    if (userBg) formData.append('userBg', userBg);
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

  const handleBgChange = (val) => {
    setSelectedBg(val);
    setUserBg(null);
  };

  const handleUserBg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedBg('user');
      setUserBg(file);
    }
  };

  return (
    <div className="editor-page">
      <h1 className="editor-title">Edit Your Image</h1>
      <div className="editor-bg-options">
        <span>Choose a background:</span>
        {presetBackgrounds.map(bg => (
          <button
            key={bg.name}
            className={`bg-btn${selectedBg === bg.value ? ' selected' : ''}`}
            onClick={() => handleBgChange(bg.value)}
          >
            {bg.name}
          </button>
        ))}
        <label className="bg-btn user-upload">
          Upload Image
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUserBg} />
        </label>
      </div>
      <ImageUploader onProcess={handleProcess} images={images} loading={loading} />
    </div>
  );
}

export default ImageEditorPage;
