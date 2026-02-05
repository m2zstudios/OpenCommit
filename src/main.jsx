// Entry point that bootstraps the React application into the DOM.
// Keeping this minimal ensures a predictable render pipeline for the immutable feed.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps surface issues early while preserving runtime behavior.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
