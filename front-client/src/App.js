import React, { Component } from "react";
import "./App.css";
import Home from "./components/home/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./components/authentification/Signup";
import Login from "./components/authentification/Login";
import Profile from "./components/profile/Profile";
import AuthService from "./components/authentification/auth-service";
import Mapbirds from "./components/map/Mapbirds";
import Navbar from "./components/navbar/Navbar";
import ThreadForm from "./components/forum/ThreadForm";
import ThreadListAll from "./components/forum/ThreadListAll";
import ThreadDetails from "./components/forum/ThreadDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin() //checkt ob, eingeloggt?
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
    this.fetchUser();
    return (
      <div className="App">
        <Navbar
          getUser={this.getTheUser}
          userInSession={this.state.loggedInUser}
        />
        <Switch>
          <Route exact path="/mapbirds" component={Mapbirds} />
          <Route exact path="/threads" component={ThreadListAll} />
          {/* <Route exact path="/threads/:id" component={ThreadDetails} /> */}
          <Route
            exact
            path="/threads/:id"
            render={({match}) =>
              this.state.loggedInUser ? (
                <ThreadDetails userInSession={this.state.loggedInUser} match={match} />
              ) : (
                <ThreadDetails userInSession={this.state.loggedInUser} match={match} />
              )
            }
          />

          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/profile"
            render={() =>
              this.state.loggedInUser ? (
                <Profile userInSession={this.state.loggedInUser} />
              ) : (
                <Profile userInSession={this.state.loggedInUser} />
              )
            }
          />
          <Route
            exact
            path="/threadform"
            render={() =>
              this.state.loggedInUser ? (
                <ThreadForm
                  // getUser={this.getTheUser}
                  userInSession={this.state.loggedInUser}
                />
              ) : (
                <ThreadForm
                  // getUser={this.getTheUser}
                  userInSession={this.state.loggedInUser}
                />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              this.state.loggedInUser ? (
                <Redirect to="/profile" />
              ) : (
                <Login getUser={this.getTheUser} />
              )
            }
          />
          <Route
            exact
            path="/signup"
            render={() =>
              this.state.loggedInUser ? (
                <Redirect to="/profile" />
              ) : (
                <Signup getUser={this.getTheUser} />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
