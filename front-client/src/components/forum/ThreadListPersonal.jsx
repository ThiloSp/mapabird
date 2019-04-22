import React, { Component } from "react";
import { Link } from "react-router-dom";
import ForumService from "./forum-service";

export default class ThreadListPersonal extends Component {
  constructor() {
    super();
    this.state = { listOfThreads: [] };
    this.service = new ForumService();
  }

  getList = () => {
    const userId = this.props.userInSession._id;
    this.service.getPersonalThreads(userId).then(response => {
      this.setState({
        listOfThreads: response.threads
      });
    });
  };

  componentDidMount() {
    this.getList();
  }

  render() {
    return (
      <div>
        <h3 className="whiteTextTitle">Your Threads:</h3>
        {this.state.listOfThreads.map(thread => {
          return (
            <div className="backgroundGrey" key={thread._id}>
              <Link
                style={{ textDecoration: "none", color: "#061324" }}
                to={`/threads/${thread._id}`}
              >
                <p className="threadLink">{thread.searchName}</p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
