import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Vegetable from './container/vegetables';
import Signup from './container/signUp/Signup';
import Signin from './container/signIn/Signin';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class App extends Component {
  
  render() {
    let navLink = (
      <div className="Tab">
        <NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
          Sign In
        </NavLink>
        <NavLink exact to="/" activeClassName="activeLink" className="signUp">
          Sign Up
        </NavLink>
      </div>
    );
    const login = localStorage.getItem("isLoggedIn");

    return (
      <div className="App">
        {login ? (
          <Router>
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/vegetable" component={Vegetable}></Route>
          </Router>
        ) : (
          <Router>
            {navLink}
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/vegetable" component={Vegetable}></Route>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
