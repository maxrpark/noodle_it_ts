import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  AppProvider,
  ProductsProvider,
  UserProvider,
  FilterProvider,
  CartProvider,
} from './context';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ProductsProvider>
        <UserProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </UserProvider>
      </ProductsProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
