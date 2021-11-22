import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';
import Search from './pages/Search';
import PageNotFound from './pages/PageNotFound';

const App = function () {
  const [username, setUsername] = useState('');
  useEffect(() => {
    fetch('/get-username').then((res) => res.json()).then((data) => {
      setUsername(data.username);
    });
  }, []);
  return (
    <Router>
      <NavBar username={username} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/favorite" element={<Favorite option="recipe" />} />
        <Route path="/search/:option/:zip/:keyword" element={<Search />} />
        <Route path="/*" element={<PageNotFound />} />
        `
        <Route path="/setting" element={<Setting />} />
        <Route
          path="/logout"
          render={() => {
            fetch('/logout');
            window.location.href = '/login';
          }}
        />
      </Routes>
    </Router>
  );
};

export default App;
