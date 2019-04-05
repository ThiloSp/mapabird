import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../authentification/auth-service";
import ProfileService from "./profile-service";
import AddProfilePic from "./addProfilePic";
import ThreadListPersonal from "../forum/ThreadListPersonal";
import "./Profile.scss";

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
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    // console.log("user ID: ", this.state.loggedInUser._id);
    const userID = this.state.loggedInUser._id;
    const uploadData = new FormData();
    uploadData.append("photoPath", e.target.files[0]);
    this.profileService
      .handleUpload(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        this.setState({
          ...this.state,
          loggedInUser: { photoPath: response.secure_url }
        });
        // console.log(this.state);
        this.profileService
          .updatePhotoProfile(response, userID)
          .then(response => {
            // console.log(response);
          });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <div>
          <h2 className="title">Welcome {this.state.loggedInUser.username}!</h2>
          <div className="container marginCon">
            <div className="row">
              <div classname="col-4">
                <div className="backgroundLightBlue">
                  <img
                    className="profilePic"
                    src={this.state.loggedInUser.photoPath}
                    alt=""
                  />
                  <AddProfilePic
                    userInSession={this.state.loggedInUser}
                    handleChange={this.handleFileUpload}
                  />
                </div>
              </div>
              <div className="col">
                <div className="backgroundDark">
                  <ThreadListPersonal userInSession={this.state.loggedInUser} />
                  <p>
                    <Link className="linkButton" to="/threadform">
                      New Thread
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
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
