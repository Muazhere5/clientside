import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthProvider from './providers/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast'; // For showing error/success messages

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. AuthProvider: Makes Firebase user context available throughout the app.
      2. Toaster: Initializes the environment for showing toast/sweet alerts
         (meeting the assignment's non-default alert requirement).
    */}
    <AuthProvider>
      <App />
      <Toaster 
        position="top-center" // Common position for alerts
        toastOptions={{
          success: { style: { background: '#10b981', color: 'white' } },
          error: { style: { background: '#ef4444', color: 'white' } },
        }}
      />
    </AuthProvider>
  </React.StrictMode>,
);