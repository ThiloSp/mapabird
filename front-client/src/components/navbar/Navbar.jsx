import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../authentification/auth-service";
import "../navbar/Navbar.scss";

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
      <nav>
        <ul className="nav justify-content-end">
        <div className="navbar-brand">
          <img className="logoNav" src="/images/aguila-white.png" alt="" />
        </div>
          <li className="nav-item">
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
              <button className="navButton" onClick={() => this.logoutUser()}>
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

{
  /* <ul class="nav justify-content-end">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul> */
}
