import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/App.css';
import { useGlobalContext } from './Context';

// Layout
import UsersShareLayout from './Layouts/UsersShareLayout';
import CommonLayout from './Layouts/CommonLayout';

// Components
import Navbar from './components/Navbar';
import NavbarUser from './components/NavbarUser';
import Footer from './components/Footer';

// views
import Home from './views/Home';
import Noodle from './views/Noodle';
import Brand from './views/Brand';
import Category from './views/Category';
import Tags from './views/Tags';
import Error from './views/Error';

// auth views

import Register from './views/auth/Register';
import LogIn from './views/auth/LogIn';
import Dashboard from './views/auth/Dashboard ';
import ProtectedRoute from './views/auth/ProtectedRoute';

function App() {
  const { userAuth } = useGlobalContext();
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
