import React from 'react';
import ReactDOM from 'react-dom/client';
import { ResumeApp } from './app/ResumeApp';
import './styles/reset.css';
import './styles/resume.css';
import './styles/print.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResumeApp />
  </React.StrictMode>
);

