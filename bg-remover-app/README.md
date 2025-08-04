# Background Remover App

A full-stack app to remove image backgrounds and download in multiple sizes.

---

## Features
- Upload an image, remove its background locally (no external APIs)
- Download the processed image in original, 512x512, and 256x256 sizes
- Modern React frontend, Flask backend, rembg & Pillow for processing

---

## Folder Structure
```
bg-remover-app/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── utils/
│       └── bg_remover.py
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── assets/
│       ├── components/
│       │   └── ImageUploader.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.jsx
│       └── index.css
└── README.md
```

---

## Getting Started

### 1. Backend (Flask)

```bash
cd bg-remover-app/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```

- Flask runs at `http://127.0.0.1:5000`

### 2. Frontend (React)

```bash
cd bg-remover-app/frontend
npm install
npm start
```

- React runs at `http://localhost:3000`

---

## Usage
1. Open the frontend in your browser (`localhost:3000`)
2. Upload an image (PNG/JPG)
3. Wait for processing, then preview and download the background-removed images

---

## Notes
- All image processing is local (no external API calls)
- If you get CORS errors, ensure both frontend and backend are running
- For best results, use high-contrast images

---

## Credits
- [rembg](https://github.com/danielgatis/rembg)
- [Pillow](https://python-pillow.org/)

---

## License
MIT
