import React, { Component } from "react";
import ForumService from "./forum-service";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", isShowing: false };
    this.service = new ForumService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const content = this.state.content;
    const threadId = this.props.theThread._id;
    const creatorId = this.props.loggedInUser._id;
    this.service
      .addNewComment(title, content, threadId, creatorId)
      .then(() => {
        this.props.getTheThread();
        this.setState({ title: "", content: "", isShowing: false });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  };

  showAddCommentForm = () => {
    if (this.state.isShowing) {
      return (
        <div>
          <h3>Add Comment</h3>
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
  };

  render() {
    return (
      <div>
        <button onClick={() => this.toggleForm()}>Add comment</button>
        {this.showAddCommentForm()}
      </div>
    );
  }
}
