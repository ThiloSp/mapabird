import React, { Component } from "react";
import ForumService from "./forum-service";
import UserInfo from "./UserInfo";

export default class CommentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.service = new ForumService();
  }

  getTheComment = () => {
    const commentId = this.props.commentId;
    this.service
      .getCommentDetail(commentId)
      .then(responseFromApi => {
        console.log("responseFromApi: ", responseFromApi);
        this.setState(responseFromApi);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getTheComment();
  }

  render() {
    return (
      <div>
        {this.state.creatorId ? (
          <UserInfo creator={this.state.creatorId} />
        ) : (
          undefined
        )}
        <h1>{this.state.title}</h1>
        <p>{this.state.content}</p>
      </div>
    );
  }
}
