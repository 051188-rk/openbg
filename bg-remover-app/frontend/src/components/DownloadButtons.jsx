import React from 'react';
import './DownloadButtons.css';

const sizes = [
  { label: 'Original', value: 'original' },
  { label: '512x512', value: '512' },
  { label: '256x256', value: '256' },
];

function DownloadButtons({ onDownload }) {
  return (
    <div className="download-btns">
      {sizes.map((s) => (
        <button key={s.value} className="download-btn" onClick={() => onDownload(s.value)}>
          Download {s.label}
        </button>
      ))}
    </div>
  );
}

export default DownloadButtons;
