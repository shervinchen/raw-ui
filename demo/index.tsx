import React from 'react';
import ReactDOM from 'react-dom/client';
import { RawUIProvider } from '../packages';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RawUIProvider>
    <App />
  </RawUIProvider>
);
