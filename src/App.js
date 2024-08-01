import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Blog from './components/Blog';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Website</h1>
          <nav className="App-nav">
            <ul>
              <li>
                <Link to="/">
                  <img src="https://static-00.iconduck.com/assets.00/home-icon-2048x1951-2wkyg5fe.png" alt="Home" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <img src="https://static.thenounproject.com/png/2940521-200.png" alt="About" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <img src="https://cdn-icons-png.flaticon.com/256/455/455705.png" alt="Contact" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <img src="https://cdn-icons-png.flaticon.com/512/4922/4922073.png" alt="Blog" />
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <footer className="App-footer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LinkedIn_logo.svg" alt="LinkedIn" className="linkedin-logo" onClick={() => window.open("https://www.linkedin.com/in/nathan-browne-a8897814a/", "_blank")} />
          <h1 className="App-title">Website</h1>
          <nav className="App-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </nav>
        </footer>
      </div>
    </Router>
  );
}

export default App;
