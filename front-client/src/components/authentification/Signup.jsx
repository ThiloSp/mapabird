import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: ""
        });
        this.props.getUser(
          response
        ); /* holt User-Daten aus dem Back und schickt sie nach App.js */
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="formBoxCenterParent">
        <div className="formBoxCenter">
          <h2>Sign-up</h2>
          <div>
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <input className="linkButton" type="submit" value="Signup" />
            </form>

            <p>Already have account?</p>
            <div>
              <Link className="linkButton" to="/login">
                {" "}
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;
