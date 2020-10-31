import React from 'react';

//import './App.css';
import './Style.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import RssReader from './pages/RssReader'
import About from './pages/About'
import Layout from './pages/Layout';

function App_orig() {
  return (
    <Router>
      <div className="app">
      <div className="p-grid">
        <header className="p-col p-shadow-1">
          <Link to="/">RSS Reader</Link>

          <div className="top-navbar">
            <Link to="/about">About</Link>
          </div>
        </header>
      </div>
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
function App(){
  return (
    <Layout />
  )
}

export default App;
