import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import BackgroundOptions from './BackgroundOptions';
import DownloadButtons from './DownloadButtons';
import './BackgroundEditorPage.css';

function BackgroundEditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageFile = location.state?.imageFile;

  const [step, setStep] = useState('original'); // 'original', 'removing', 'removed', 'editing', 'converted'
  const [displayImage, setDisplayImage] = useState(null); // Data URL for preview
  const [transparentImage, setTransparentImage] = useState(null); // Result
  const [convertedImage, setConvertedImage] = useState(null); // Final with background
  const [bgChoice, setBgChoice] = useState(null); // solid, sample, user
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadData, setDownloadData] = useState({});

  // On mount, convert file to data URL
  useEffect(() => {
    if (!imageFile) {
      navigate('/');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setDisplayImage(e.target.result);
    reader.readAsDataURL(imageFile);
  }, [imageFile, navigate]);

  // Handler for "Remove Background"
  const handleRemoveBackground = async () => {
    setStep('removing');
    setLoading(true);
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      const response = await fetch('http://127.0.0.1:5000/remove-bg', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setTransparentImage(`data:image/png;base64,${data.original}`);
      setDownloadData({
        original: data.original,
        size_512: data.size_512,
        size_256: data.size_256,
      });
      setStep('removed');
    } catch (err) {
      alert('Error processing image');
      setStep('original');
    }
    setLoading(false);
  };

  // Handler for "Convert" (apply new background)
  const handleConvert = async () => {
    if (!bgChoice) return;
    setStep('converting');
    setLoading(true);
    const formData = new FormData();
    formData.append('image', imageFile);
    if (bgChoice.type === 'color') {
      formData.append('background', bgChoice.value);
    } else if (bgChoice.type === 'image') {
      // Fetch newbg image as blob and send as userBg
      const response = await fetch(bgChoice.value);
      const blob = await response.blob();
      formData.append('userBg', blob, 'newbg.jpg');
    } else if (bgChoice.type === 'user') {
      formData.append('userBg', bgChoice.value);
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/replace-bg', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setConvertedImage(`data:image/png;base64,${data.result}`);
      setDownloadData({
        original: data.original,
        size_512: data.size_512,
        size_256: data.size_256,
      });
      setStep('converted');
    } catch (err) {
      alert('Error converting background');
      setStep('removed');
    }
    setLoading(false);
  };

  // Undo/Redo
  const handleUndo = () => {};
  const handleRedo = () => {};

  // Download
  const handleDownload = (size) => {
    const b64 = downloadData[size === 'original' ? 'original' : `size_${size}`];
    if (!b64) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${b64}`;
    link.download = `openbg-${size}.png`;
    link.click();
  };

  return (
    <div className="editor-page">
      {step === 'original' && (
        <div className="editor-stage">
          <img src={displayImage} alt="Original" className="editor-image" />
          <button className="editor-action-btn" onClick={handleRemoveBackground}>Remove Background</button>
        </div>
      )}
      {step === 'removing' && (
        <div className="editor-stage">
          <div className="editor-image-blur">
            <img src={displayImage} alt="Removing..." className="editor-image" />
            <Loader />
          </div>
        </div>
      )}
      {step === 'removed' && transparentImage && (
        <div className="editor-stage">
          <img src={transparentImage} alt="Transparent" className="editor-image" />
          <DownloadButtons onDownload={handleDownload} />
          <BackgroundOptions onSelect={setBgChoice} />
          <button className="editor-action-btn" onClick={handleConvert}>Convert</button>
          <div className="editor-undo-redo">
            <button onClick={handleUndo}>Undo</button>
            <button onClick={handleRedo}>Redo</button>
          </div>
        </div>
      )}
      {step === 'converted' && convertedImage && (
        <div className="editor-stage">
          {/* Show final image with new background */}
          <img src={convertedImage} alt="Final" className="editor-image" />
          <DownloadButtons onDownload={handleDownload} />
        </div>
      )}
    </div>
  );
}

export default BackgroundEditorPage;
