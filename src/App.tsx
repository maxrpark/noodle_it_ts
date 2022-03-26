import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';

// Components
import Footer from './components/Footer';

// views
import Home from './views/Home';
import Noodle from './views/Noodle';
import Brand from './views/Brand';
import Category from './views/Category';
import Tags from './views/Tags';
function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:slug' element={<Noodle />} />
          <Route path='/brand/:slug' element={<Brand />} />
          <Route path='/category/:slug' element={<Category />} />
          <Route path='/Tags/:slug' element={<Tags />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
