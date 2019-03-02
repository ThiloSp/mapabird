import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../authentification/auth-service";
import AddProfilePic from "./addProfilePic";

class Profile extends Component {
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

  /* logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  }; */

  render() {
    if (this.state.loggedInUser) {
      return (
        <div>
          <h2>Welcome, {this.state.loggedInUser.username}!</h2>
          <img src={this.state.loggedInUser.photoPath} alt="" />
          <AddProfilePic userInSession={this.state.loggedInUser} />
        </div>
      );
    } else {
      return (
        <div>
          <h2>Oh sorry, you are not logged in!</h2>
          <div>
            <Link to="/login">Log-in</Link>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
