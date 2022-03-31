import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './Context';
import { UserProvider } from './context/userContext';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
