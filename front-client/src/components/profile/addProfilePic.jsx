import React, { Component } from "react";
import ProfileService from "./profile-service";

export default class AddProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
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
        this.setState({ photoPath: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };
  render() {
    return (
      <div>
        <h2>Change Profile Pic</h2>
        <form>
          <label>Upload your photo</label>
          <input type="file" onChange={e => this.handleFileUpload(e)} />
        </form>
      </div>
    );
  }
}
