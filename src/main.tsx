import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from 'react-modal';
import { CalendarProvider } from './contexts/CalendarContext';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CalendarProvider>
      <App />
    </CalendarProvider>
  </React.StrictMode>,
)
