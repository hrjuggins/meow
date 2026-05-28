import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WelcomePage } from './pages/WelcomePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/welcome/:userId" element={<WelcomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
