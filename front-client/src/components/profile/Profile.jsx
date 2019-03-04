import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../authentification/auth-service";
import ProfileService from "./profile-service";
import AddProfilePic from "./addProfilePic";

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
    console.log("user ID: ", this.state.loggedInUser._id)
    // const userID = this.state.loggedInUser._id;
    const uploadData = new FormData();
    uploadData.append("photoPath", e.target.files[0]);
    this.profileService
      .handleUpload(uploadData)
      .then(response => {
        console.log("response is: ", response);
        this.setState({
          ...this.state,
          loggedInUser: { photoPath: response.secure_url } // man sieht Foto, es wird aber nicht gespeichert. Muss iregndwie in die Datenbank rein. Eventuell mit handleSubmit in Kommentar
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

 /*  handleSubmit = e => {
    e.preventDefault();
    this.profileService
      .savePhoto(this.state)
      .then(res => {
        console.log("added: ", res);
      })
      .catch(err => {
        console.log("Error while adding the photo: ", err);
      });
  }; */

  render() {
    if (this.state.loggedInUser) {
      return (
        <div>
          <h2>Welcome, {this.state.loggedInUser.username}!</h2>
          <img src={this.state.loggedInUser.photoPath} alt="" />
          {/* <AddProfilePic userInSession={this.state.loggedInUser} /> */}
          <AddProfilePic
            userInSession={this.state.loggedInUser}
            handleChange={this.handleFileUpload}
          />
          <Link to="/threadform">New Thread</Link>
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
