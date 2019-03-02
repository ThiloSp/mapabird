import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../authentification/auth-service";
import AddProfilePic from "./addProfilePic";
import ProfileService from "./profile-service";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.profileService = new ProfileService();
  }

  componentDidMount() {
    this.setState({ ...this.state, loggedInUser: this.props.userInSession });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("photoPath", e.target.files[0]);
    this.profileService
      .handleUpload(uploadData)
      .then(response => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({...this.state, loggedInUser: {photoPath: response.secure_url}});
        console.log(this.state)
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <div>
          <h2>Welcome, {this.state.loggedInUser.username}!</h2>
          <img src={this.state.loggedInUser.photoPath} alt="" />
          {/* <AddProfilePic userInSession={this.state.loggedInUser} /> */}
          <AddProfilePic userInSession={this.state.loggedInUser} handleChange={this.handleFileUpload}/>
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
