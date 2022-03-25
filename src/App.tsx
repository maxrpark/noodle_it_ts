import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';

// views
import Home from './views/Home';
import Noodle from './views/Noodle';
import Brand from './views/Brand';
import Category from './views/Category';
function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:slug' element={<Noodle />} />
          <Route path='/brand/:slug' element={<Brand />} />
          <Route path='/category/:slug' element={<Category />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
