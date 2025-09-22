import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Notyf CSS for toast styling
import 'notyf/notyf.min.css';
// Ensure Notyf is also available as a global in case some bundles expect it
import { Notyf } from 'notyf';
if (typeof window !== 'undefined' && !window.Notyf) {
  window.Notyf = Notyf;
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
