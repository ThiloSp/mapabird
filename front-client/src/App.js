import React, { Component } from "react";
import "./App.css";
import Home from "./components/home/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./components/authentification/Signup";
import Login from "./components/authentification/Login";
import Profile from "./components/profile/Profile";
import AuthService from './components/authentification/auth-service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
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
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
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
            <Route
              exact
              path="/login"
              render={() => <Redirect to="/profile" />}
            />
            <Route
              exact
              path="/signup"
              render={() => <Redirect to="/profile" />}
            />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login getUser={this.getTheUser} />}
            />
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
}

export default App;
//   render() {
//     return (
//       <div className="App">
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route
//             exact
//             path="/signup"
//             render={() => <Signup getUser={this.getTheUser} />}
//           />
//           <Route exact path="/login" component={Login} />
//           <Route
//             exact
//             path="/profile"
//             render={() => (
//               <Profile
//                 getUser={this.getTheUser}
//                 userInSession={this.state.loggedInUser}
//               />
//             )}
//           />
//         </Switch>
//       </div>
//     );
//   }
// }

// export default App;
