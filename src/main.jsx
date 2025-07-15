import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { QuizProvider } from './context/QuizContext';
import './i18n'; // For language setup

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);