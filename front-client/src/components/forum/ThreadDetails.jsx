import React, { Component } from "react";
import { Link } from "react-router-dom";
import ForumService from "./forum-service";
import CommentForm from "./CommentForm";
import CommentDetail from "./CommentDetail";
import UserInfo from "./UserInfo";

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
    if (!this.state.title) {       //??? solo deberia salir cuando loggeado
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
    console.log("this.state: ",this.state)
    console.log("this.state.comments: ",this.state.comments)
    console.log("this.state.creatorId: ",this.state.creatorId)
    return (
      <div>
        <h2>This is ThreadDetails</h2>
        <h3>{this.state.title}</h3>
        {/* first constructor, second render, third componentDidMount, dann wegen stateWechsel wieder render. Da diese Daten aus dem componentDidMount kommen muss ich im render sicherstellen, dass creatorId schon vorhanden ist, bevor die Props gesendet werden. beim ersten render ist this.state.creatorId noch nicht da, also tritt im ternario undefined ein, was bedeutet, dass er gar nichts macht. beim zweiten render sind die Daten dann da und die Props werden geschickt. */}
        {this.state.creatorId ? <UserInfo creator={this.state.creatorId} /> : undefined } 
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
