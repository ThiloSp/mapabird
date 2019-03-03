import React, { Component } from "react";
import ForumService from "./forum-service";

export default class ThreadForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "" };
    this.service = new ForumService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const content = this.state.content;
    const creatorId = this.props.userInSession._id
    // console.log("creatorId: ",creatorId)
    this.service
      .addNewThread(title, content, creatorId)
      .then(() => {
        this.setState({
          title: "",
          content: ""
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h2>This is New Thread</h2>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />
          <label>Content:</label>
          <textarea
            name="content"
            value={this.state.content}
            onChange={e => this.handleChange(e)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
