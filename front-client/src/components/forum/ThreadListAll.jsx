import React, { Component } from "react";
import { Link } from "react-router-dom";
import ForumService from "./forum-service";

export default class ThreadListAll extends Component {
  constructor() {
    super();
    this.state = { listOfThreads: [] };
    this.service = new ForumService();
  }

  getList = () => {
    this.service.getAllThreads().then(response => {
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
        <h2 className="title">Do you like to read?</h2>
        <div className="container marginCon">
          <div className="row">
            <div className="col">
              <div className="backgroundLightBlue">
                <h2 className="whiteTextTitle">Have a look at our Threads</h2>
              </div>
            </div>
            <div className="col">
              <div className="backgroundDark">
                {this.state.listOfThreads.map((thread, idx) => {
                  return (
                    <div className="backgroundGrey" key={thread._id}>
                      <Link
                        style={{ textDecoration: "none", color: "#061324" }}
                        to={`/threads/${thread._id}`}
                      >
                        <p className="threadLink">
                          Thread {idx + 1}: {thread.searchName}
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
