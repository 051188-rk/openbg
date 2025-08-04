import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import BackgroundEditorPage from './components/BackgroundEditorPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editor" element={<BackgroundEditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
