import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import RssReader from './pages/RssReader'
import About from './pages/About'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <Link to="/">RSS Reader</Link>

          <div className="top-navbar">
            <Link to="/about">About</Link>
          </div>
        </header>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <RssReader />
          </Route>
        </Switch>
        <footer>
          <span>&nbsp;</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
