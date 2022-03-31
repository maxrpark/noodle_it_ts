import './styles/App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useUserContext } from './context/userContext';

// Layout
import { CommonLayout, UsersShareLayout } from './Layouts/';

// views
import { Brand, Category, Error, Home, Noodle, Tags } from './views';
// auth views
import { Dashboard, LogIn, ProtectedRoute, Register } from './views/auth';

// Components
import { Footer, Navbar, NavbarUser } from './components/';

function App() {
  const { userAuth } = useUserContext();
  return (
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
            <Route path='/register' element={<Register />} />
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
  );
}

export default App;
