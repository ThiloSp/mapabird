import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        <h2>This is Login</h2>
        <Link to="/">Home</Link>
        <p>
          Don't you already have an account?
          <Link to="/signup">Signup</Link>
        </p>
      </div>
    );
  }
}
