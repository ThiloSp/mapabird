import React, { Component } from "react";
import { Link } from "react-router-dom";
import ForumService from "./forum-service";

export default class ThreadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.service = new ForumService();
  }

  getSingleThread = () => {
    console.log("this.props.match: ", this.props.match)
    const { params } = this.props.match; // to get id from URL
    this.service.getThreadDetails(params)
      .then(response => {
        console.log("response: ", response)
        this.setState(response);
      })
      .catch(err => {
        console.log(err);
      }); 
  };

  componentDidMount() {
    this.getSingleThread();
  }

  render() {
    return (
      <div>
        <h2>This is ThreadDetails</h2>
        <h3>{this.state.title}</h3>
        <p>{this.state.content}</p>
        <Link to={"/threads"}>Back to Forum</Link>
      </div>
    );
  }
}
