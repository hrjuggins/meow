import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SAMPLE_USER_ID } from './constants';
import { WelcomePage } from './pages/WelcomePage';

export function App() {
  const sampleWelcomePath = `/welcome/${SAMPLE_USER_ID}`;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={sampleWelcomePath} replace />} />
        <Route path="/welcome/:userId" element={<WelcomePage />} />
        <Route path="*" element={<Navigate to={sampleWelcomePath} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
