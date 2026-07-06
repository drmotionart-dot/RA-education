import '@fontsource/sora/400.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/literata/400.css';
import '@fontsource/literata/500.css';
import './styles/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
