// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const el = document.getElementById('root');
if (!el) {
  throw new Error('Root element #root not found');
}

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>
);
// Load measurement code after the initial application module, without any remote analytics script.
void import('./lib/vitals').then(({ observeVitals }) => observeVitals());
