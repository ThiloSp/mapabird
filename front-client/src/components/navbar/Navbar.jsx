import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../authentification/auth-service";
import "../navbar/Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentDidMount() {
    this.setState({ ...this.state, loggedInUser: this.props.userInSession });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  };
  render() {
    return (
      <nav className="nav">
        <ul>
          <li className="show">
            <Link to="/" style={{ textDecoration: "none", color: "#F1F1F1" }}>
              Home
            </Link>
          </li>
          <li className={this.state.loggedInUser ? "hide" : "show"}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#F1F1F1" }}
            >
              Log-in
            </Link>
          </li>
          <li className={this.state.loggedInUser ? "hide" : "show"}>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#F1F1F1" }}
            >
              Sign-up
            </Link>
          </li>
          <li className={this.state.loggedInUser ? "show" : "hide"}>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#F1F1F1" }}
            >
              Profile
            </Link>
          </li>
          <li className={this.state.loggedInUser ? "show" : "hide"}>
            <Link to="/">
              <button onClick={() => this.logoutUser()}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
