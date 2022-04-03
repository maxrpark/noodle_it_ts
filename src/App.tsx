import './styles/App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useUserContext } from './context/userContext';

// Layout
import { CommonLayout, UsersShareLayout } from './Layouts/';

// views
import { Brand, Category, Error, Home, Noodle, Tags } from './views';
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

function App() {
  const { userAuth } = useUserContext();
  const { theme } = useGlobalContext();
  console.log(theme);
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkthem}>
      <GlobalStyle />
      <div className='app'>
        {' '}
        <Router>
          {userAuth === null ? <Navbar /> : <NavbarUser />}
          <Routes>
            <Route path='/' element={<CommonLayout />}>
              <Route index element={<Home />} />
              <Route path='/noodle/:slug' element={<Noodle />} />
              <Route path='/brand/:slug' element={<Brand />} />
              <Route path='/category/:slug' element={<Category />} />
              <Route path='/tags/:slug' element={<Tags />} />
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
