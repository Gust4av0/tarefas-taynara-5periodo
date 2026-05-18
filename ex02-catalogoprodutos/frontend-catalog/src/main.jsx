import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast'; // Importação do Toaster

import './styles/critical.css';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster 
      position="bottom-right" 
      toastOptions={{
        duration: 3000,
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
      }} 
    />
    <Home />
  </React.StrictMode>
);