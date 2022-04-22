import './styles/App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useUserContext } from './context/userContext';

// Layout
import { CommonLayout, UsersShareLayout } from './Layouts/';

// views
import {
  Error,
  Home,
  Noodle,
  Products,
  Tags,
  ResultPage,
  ListPage,
  NoodlesType,
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
        {' '}
        <Router>
          <ScrollToTop />
          {userAuth === null ? <Navbar /> : <NavbarUser />}
          <Routes>
            <Route path='/' element={<CommonLayout />}>
              <Route index element={<Home />} />
              <Route path='/products/' element={<Products />} />
              <Route path='/noodles/:query/:slug' element={<NoodlesType />} />
              <Route path='/noodle/:slug' element={<Noodle />} />
              <Route path='/tags/:slug' element={<Tags />} />
              <Route path='/list-page/:slug' element={<ListPage />} />
              <Route path='/search' element={<ResultPage />} />
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
            <Route path='/dashboard' element={<UsersShareLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
