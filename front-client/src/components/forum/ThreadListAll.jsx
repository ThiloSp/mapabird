import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ForumService from "./forum-service";

export default class ThreadListAll extends Component {
  constructor() {
    super();
    this.state = { listOfThreads: [] };
    this.service = new ForumService();
  }

  getList = () => {
    this.service.getAllThreads().then(response => {
      // console.log("response1 is: ", response)
      console.log("response1 threads is: ", response.threads);
      this.setState({
        listOfThreads: response.threads
      });
      console.log(this.state.listOfThreads);
    });
  };

  componentDidMount() {
    this.getList();
  }

  render() {
    return (
      <div>
        <h2>This is Forum</h2>
        <div>
          {this.state.listOfThreads.map(thread => {
            return (
              <div key={thread._id}>
                <Link to={`/threads/${thread._id}`}>
                  <h3>{thread.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
