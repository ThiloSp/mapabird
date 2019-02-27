import React, { Component } from "react";
import "./App.css";
import Home from "./components/home/Home";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/authentification/Signup";
import Login from "./components/authentification/Login";
import Profile from "./components/profile/Profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={this.getTheUser} />}
          />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/profile"
            render={() => (
              <Profile
                getUser={this.getTheUser}
                userInSession={this.state.loggedInUser}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
