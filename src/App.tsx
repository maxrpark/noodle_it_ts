import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';

// views
import Home from './views/Home';
import Noodle from './views/Noodle';
function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:slug' element={<Noodle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
