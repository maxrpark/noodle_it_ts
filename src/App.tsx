import './styles/App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Layout
import { CommonLayout, UsersShareLayout } from './Layouts/';
import { ThemeProvider } from 'styled-components';
import { useGlobalContext } from './context/globalContext';
import { GlobalStyle, lightTheme, darkthem } from './Layouts/theme';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// views
import {
  AboutPage,
  Cart,
  Checkout,
  Error,
  Home,
  ListPage,
  Noodle,
  NoodlesType,
  OrderDetailsPage,
  Products,
  ResultPage,
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
import { Sidebar, Footer, Navbar, Discount } from './components';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { theme } = useGlobalContext();
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkthem}>
      <GlobalStyle />
      <div className='app'>
        <Router>
          <Sidebar />
          <ScrollToTop />
          <Discount />
          <Navbar />
          <Routes>
            <Route path='/' element={<CommonLayout />}>
              <Route index element={<Home />} />
              <Route path='/products/' element={<Products />} />
              <Route path='/about' element={<AboutPage />} />
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
                    <OrderDetailsPage />
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
