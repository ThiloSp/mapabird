import React, { Component } from "react";
/* import ProfileService from "./profile-service"; */

export default class AddProfilePic extends Component {
 /*  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.profileService = new ProfileService();
  }

  componentDidMount() {
    this.setState({ ...this.state, loggedInUser: this.props.userInSession });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  } */

  render() {
    return (
      <div>
        <h2>Change Profile Pic</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Upload your photo</label>
          <input type="file" onChange={e => this.props.handleChange(e)} />
          <button type="submit">Save new thing</button>
        </form>
      </div>
    );
  }
}