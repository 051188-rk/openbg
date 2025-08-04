import React, { useState } from 'react';
import './BackgroundOptions.css';

// Color backgrounds removed as per user request.
const imageBackgrounds = [
  { name: 'BG1', url: require('../newbg/bg1.jpg') },
  { name: 'BG2', url: require('../newbg/bg2.jpg') },
  { name: 'BG3', url: require('../newbg/bg3.jpg') },
  { name: 'BG4', url: require('../newbg/bg4.jpg') },
  { name: 'BG5', url: require('../newbg/bg5.jpg') },
  { name: 'BG6', url: require('../newbg/bg6.jpg') },
  { name: 'BG7', url: require('../newbg/bg7.jpg') },
  { name: 'BG8', url: require('../newbg/bg8.jpg') },
  { name: 'BG9', url: require('../newbg/bg9.jpg') },
  { name: 'BG10', url: require('../newbg/bg10.jpg') },
  { name: 'BG11', url: require('../newbg/bg11.jpg') },
  { name: 'BG12', url: require('../newbg/bg12.jpg') },
];

function BackgroundOptions({ onSelect }) {
  const [selected, setSelected] = useState(null);
  const [userBg, setUserBg] = useState(null);
  const [userBgUrl, setUserBgUrl] = useState(null);

  const handleSelect = (bg) => {
    setSelected(bg);
    onSelect(bg);
  };

  const handleUserBg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserBg(file);
      const url = URL.createObjectURL(file);
      setUserBgUrl(url);
      handleSelect({ type: 'user', value: file, url });
    }
  };

  return (
    <div className="bg-options">
      <div className="bg-options-label">Choose a background:</div>
      <div className="bg-options-row">

        {imageBackgrounds.map((img) => (
          <button
            key={img.name}
            className={`bg-img-btn${selected?.type === 'image' && selected.value === img.url ? ' selected' : ''}`}
            onClick={() => handleSelect({ type: 'image', value: img.url })}
          >
            <img src={img.url} alt={img.name} />
          </button>
        ))}
        <label className={`bg-upload-btn${selected?.type === 'user' ? ' selected' : ''}`}>
          {userBgUrl ? <img src={userBgUrl} alt="User BG" /> : '+'}
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUserBg} />
        </label>
      </div>
      {selected?.type === 'user' && userBgUrl && (
        <div className="bg-selected-preview">
          <span>Selected:</span>
          <img src={userBgUrl} alt="Selected user background" className="bg-selected-preview-img" />
        </div>
      )}
      {selected?.type === 'image' && (
        <div className="bg-selected-preview">
          <span>Selected:</span>
          <img src={selected.value} alt="Selected background" className="bg-selected-preview-img" />
        </div>
      )}

    </div>
  );
}

export default BackgroundOptions;
