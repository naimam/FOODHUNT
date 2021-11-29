import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';
import Search from './pages/Search';
import MealPlan from './pages/MealPlan';
import PageNotFound from './pages/PageNotFound';
import MealSurvey from './pages/MealSurvey';

const App = function () {
  const [username, setUsername] = useState('');
  const [zipcode, setZipcode] = useState(null);

  useEffect(() => {
    fetch('/get-username').then((res) => res.json()).then((data) => {
      setUsername(data.username);
    });
    fetch('/get-zipcode').then((res) => res.json()).then((data) => {
      setZipcode(data.zipcode);
    });
  }, []);
  return (
    <Router>
      <NavBar username={username} zipcode={zipcode} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/favorite" element={<Favorite option="recipe" />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/meal-survey" element={<MealSurvey />} />
        <Route path="/search/:option/:zip/:keyword" element={<Search />} />
        <Route path="/*" element={<PageNotFound />} />
        `
        <Route path="/setting" element={<Setting zipcode={zipcode} setZipcode={setZipcode} />} />
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
