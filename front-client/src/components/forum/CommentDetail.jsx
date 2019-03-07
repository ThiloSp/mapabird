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
      <div className="container">
        <div className="row">
          <div className="col-3 userinfo">
            {this.state.creatorId ? (
              <UserInfo creator={this.state.creatorId} />
            ) : (
              undefined
            )}
          </div>
          <div className="col-9 text">
            <h5>{this.state.title}</h5>
            <p>{this.state.content}</p>
          </div>
        </div>
      </div>
    );
  }
}
