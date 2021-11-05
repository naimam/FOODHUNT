import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Favorite from './pages/Favorite';

function App() {
  return (
    <>
      <Router>
        <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
          <Navbar.Brand as={Link} to="/home">
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-center"
            />{' '}
            Food Hunt</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/favorite">Favorite</Nav.Link>
            </Nav>
          </Navbar.Collapse>

        </Navbar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/favorite' element={<Favorite />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
