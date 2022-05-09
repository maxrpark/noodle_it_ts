import './styles/App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useUserContext } from './context/userContext';
import Sidebar from './components/Sidebar';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Layout
import { CommonLayout, UsersShareLayout } from './Layouts/';

// views
import {
  Error,
  Home,
  Noodle,
  Products,
  ResultPage,
  Cart,
  ListPage,
  NoodlesType,
  Checkout,
  OrderDetails,
} from './views';
// auth views
import {
  Dashboard,
  LogIn,
  ProtectedRoute,
  Register,
  ProtectedRouteRegister,
} from './views/auth';

// Components
import { Footer, Navbar, NavbarUser } from './components/';

import { ThemeProvider } from 'styled-components';
import { useGlobalContext } from './context/globalContext';

import { GlobalStyle, lightTheme, darkthem } from './Layouts/theme';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { userAuth } = useUserContext();
  const { theme } = useGlobalContext();
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkthem}>
      <GlobalStyle />
      <div className='app'>
        <Router>
          <Sidebar />
          <ScrollToTop />
          <Navbar />
          {/* {userAuth === null ? <Navbar /> : <NavbarUser />} */}
          <Routes>
            <Route path='/' element={<CommonLayout />}>
              <Route index element={<Home />} />
              <Route path='/products/' element={<Products />} />
              <Route path='/noodles/:query/:slug' element={<NoodlesType />} />
              <Route path='/noodle/:slug' element={<Noodle />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/list-page/:slug' element={<ListPage />} />
              <Route path='/search' element={<ResultPage />} />
              {/* <Route path='/checkout' element={<Checkout />} /> */}
              <Route path='/register' element={<UsersShareLayout />}>
                <Route
                  index
                  element={
                    <ProtectedRouteRegister>
                      <Register />
                    </ProtectedRouteRegister>
                  }
                />
              </Route>
              <Route path='/login' element={<LogIn />} />
              <Route path='*' element={<Error />} />
            </Route>
            <Route element={<UsersShareLayout />}>
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/checkout'
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/order-details/:id'
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
        <ToastContainer />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
