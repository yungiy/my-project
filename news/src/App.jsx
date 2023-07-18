import React from 'react';
import NewsPage from './pages/NewsPage';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsPage />} />
      <Route path="/:category?" element={<NewsPage />} />
    </Routes>
  );
}
