import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Search from './pages/Search';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/search/:option/:zip/:keyword' element={<Search />} />
          <Route path="/*" element={<NotFoundPage />} />`
        </Routes>
      </Router>
    </>
  );
}

export default App;
