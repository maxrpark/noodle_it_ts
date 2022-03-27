import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/App.css';

// Components
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
import Profile from './views/auth/Profile';

function App() {
  return (
    <div className='app'>
      <Router>
        <Link to={'/login'}>LogIn</Link>
        <Routes>
          <Route path='*' element={<Error />} />
          <Route path='/' element={<Home />} />
          <Route path='/noodle/:slug' element={<Noodle />} />
          <Route path='/brand/:slug' element={<Brand />} />
          <Route path='/category/:slug' element={<Category />} />
          <Route path='/Tags/:slug' element={<Tags />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
