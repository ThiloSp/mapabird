import React, { Component } from 'react';
import './App.css';
import Home from "./components/home/Home";
import { Switch, Route } from "react-router-dom";
import Signup from './components/authentification/Signup';
import Login from './components/authentification/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
