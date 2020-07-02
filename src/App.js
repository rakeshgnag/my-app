import React from 'react';
import logo from './logo.svg';
import './App.css';
import  { Fragment } from 'react';
import Dashboard from './Dashboard';

import Home from './Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
     <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

         
        </ul>

        <hr />

       
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
