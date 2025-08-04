import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageUploader.css';

function ImageUploader() {
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      navigate('/editor', { state: { imageFile: file } });
    }
  };

  const handleClick = () => {
    inputRef.current.value = '';
    inputRef.current.click();
  };

  return (
    <div className="uploader-container">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <button className="upload-btn" onClick={handleClick}>
        Upload Image
      </button>
    </div>
  );
}

export default ImageUploader;
