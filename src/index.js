import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  // Strict mode checks are run in development mode only; they do not impact the production build.
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
