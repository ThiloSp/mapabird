import React, { Component } from "react";
import { Link } from "react-router-dom";
import ForumService from "./forum-service";
import CommentForm from "./CommentForm";
import CommentDetail from "./CommentDetail";

export default class ThreadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.service = new ForumService();
  }

  getSingleThread = () => {
    // console.log("this.props.match: ", this.props.match);
    const { params } = this.props.match; // to get id from URL
    this.service
      .getThreadDetails(params)
      .then(response => {
        // console.log("response: ", response);
        this.setState(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getSingleThread();
  }

  renderAddCommentForm = () => {
    if (!this.state.title) {
      this.getSingleThread();
    } else {
      // pass the project and method getSingleProject() as a props down to AddTask component
      return (
        <CommentForm
          theThread={this.state}
          getTheThread={this.getSingleThread}
        />
      );
    }
  };

  render() {
    console.log(this.state.comments)
    return (
      <div>
        <h2>This is ThreadDetails</h2>
        <h3>{this.state.title}</h3>
        <p>{this.state.content}</p>
        {/* show the Comments heading only if there are comments */}
        {this.state.comments && this.state.comments.length > 0 && (
          <h4>Comments</h4>
        )}
        {this.state.comments &&
          this.state.comments.map((comment, index) => {
            return (
              <div key={index}>
                <CommentDetail commentId={comment} />
              </div>
            );
          })}
        <div>{this.renderAddCommentForm()} </div>
        <Link to={"/threads"}>Back to Forum</Link>
      </div>
    );
  }
}
