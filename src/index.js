import React from 'react';
import ReactDOM from 'react-dom/client';
import StartingRoutes from './Routes';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*
  <React.StrictMode>
    <StartingRoutes />
  </React.StrictMode>
  */
  <StartingRoutes />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * Our entire react app or you can say the App component is rendered inside a <div="root"></div> with a root id
 * 
 */