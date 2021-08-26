import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './components/landing-page/LandinPage';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
    <LandingPage />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
