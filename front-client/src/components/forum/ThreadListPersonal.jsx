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
    console.log("this is userId: ", userId);
    this.service.getPersonalThreads(userId).then(response => {
      console.log("response1 is: ", response);
      console.log("response1 threads is: ", response.threads);
      this.setState({
        listOfThreads: response.threads
      });
      console.log(this.state.listOfThreads);
    });
  };

  /* deleteThread = () => {
    // console.log("this.props.match: ", this.props.match);
    // const { params } = this.props.match;
    this.service.deleteThread();
  }; */

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
              <Link style={{ textDecoration: "none", color: "#061324" }} to={`/threads/${thread._id}`}>
                <p className="threadLink">{thread.title}</p>
              </Link>
              {/*  <button onClick={() => this.deleteThread()}>
                  Delete Thread
                </button> */}
            </div>
          );
        })}
      </div>
    );
  }
}
