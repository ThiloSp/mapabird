import React, { Component } from "react";
import ForumService from "./forum-service";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.service = new ForumService();
  }

  getUserInfo = () => {
    const creatorId = this.props.creator;
    this.service
      .getUserInfo(creatorId)
      .then(responseFromApi => {
        // console.log("creatorId: ", creatorId);
        // console.log("responseFromApi2: ", responseFromApi);
        this.setState(responseFromApi);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    return (
      <div>
        <img className="user-pic" src={this.state.photoPath} alt="" />
        <p>{this.state.username}</p>
      </div>
    );
  }
}
