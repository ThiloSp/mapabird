import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../authentification/auth-service";

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

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  };

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);
    this.service
      .handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <div>
          <h2>Welcome, {this.state.loggedInUser.username}</h2>
          <Link to="/">Home</Link>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Hello, you are not logged in</h2>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      );
    }
  }
}

export default Profile;
