import React, { Component } from "react";
import { Link } from "react-router-dom";
import ForumService from "./forum-service";
import CommentForm from "./CommentForm";
import CommentDetail from "./CommentDetail";
import UserInfo from "./UserInfo";
import MapForThreads from "../map/MapForThreads";
import "./ThreadDetails.scss";

export default class ThreadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.service = new ForumService();
  }

  componentWillReceiveProps() {
    this.getSingleThread();
  }

  getSingleThread = () => {
    const { params } = this.props.match; // to get id from URL
    this.service
      .getThreadDetails(params)
      .then(response => {
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
    if (this.props.userInSession) {
      return (
        <CommentForm
          loggedInUser={this.props.userInSession}
          theThread={this.state}
          getTheThread={this.getSingleThread}
        />
      );
    } else {
      return (
        <div className="green">
          <Link className="linkButton" to={"/login"}>
            Please log in to make a comment
          </Link>
        </div>
      );
    }
  };

  deleteThread = () => {
    const { params } = this.props.match;
    this.service.deleteThread(params);
  };

  render() {
    return (
      <div>
        <h3 className="threadTitle">{this.state.searchName}</h3>
        <p className="legend">
          {this.state.infoDisplay} in{" "}
          <img className="dots" src="../images/dotRed.png" alt="" />
          {this.state.dateSearch1} and{" "}
          <img className="dots" src="../images/dotDarkBlue.png" alt="" />
          {this.state.dateSearch2}
        </p>
        <div>
          {this.state.searchName ? (
            <div className="map">
              <MapForThreads searchName={this.state.searchName} />
            </div>
          ) : (
            undefined
          )}
        </div>
        {/* first constructor, second render, third componentDidMount, dann wegen stateWechsel wieder render. Da diese Daten aus dem componentDidMount kommen muss ich im render sicherstellen, dass creatorId schon vorhanden ist, bevor die Props gesendet werden. beim ersten render ist this.state.creatorId noch nicht da, also tritt im ternario undefined ein, was bedeutet, dass er gar nichts macht. beim zweiten render sind die Daten dann da und die Props werden geschickt. */}
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
              <p>{this.state.content}</p>
            </div>
            <button
              className="linkButton red"
              onClick={() => this.deleteThread()}
            >
              Delete Thread
            </button>
          </div>
        </div>
        {/* show the Comments heading only if there are comments */}
        <div className="commentback">
          {this.state.comments && this.state.comments.length > 0 && (
            <h4>Comments</h4>
          )}
          {this.state.comments &&
            this.state.comments.map((comment, index) => {
              return (
                <div>
                  <div key={index}>
                    <CommentDetail commentId={comment} />
                  </div>
                </div>
              );
            })}
          <div className="green">
            <p>{this.renderAddCommentForm()}</p>
          </div>
        </div>
        <div className="red">
          <Link className="linkButton" to={"/threads"}>
            Back to Forum
          </Link>
        </div>
      </div>
    );
  }
}
