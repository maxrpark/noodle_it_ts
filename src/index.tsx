import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider, ProductsProvider, UserProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ProductsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ProductsProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
