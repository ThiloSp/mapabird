import React, { Component } from 'react';
import './App.css';
import Home from "./components/home/Home";
import { Switch, Route } from "react-router-dom";
import Signup from './components/authentification/Signup';
import Login from './components/authentification/Login';

class App extends Component {

  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  render() {
    return (
      <div className="App">
         <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
