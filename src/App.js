import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorite from './pages/Favorite';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/favorite' element={<Favorite />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
