import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css'; // Make sure this is imported

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header>
      <h1>E-Commerce App</h1>
    </header>
    <App />
    <footer>
      <p>&copy; 2025 E-Commerce App. All rights reserved.</p>
    </footer>
  </StrictMode>
);