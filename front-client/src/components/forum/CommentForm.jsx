import React, { Component } from "react";
import ForumService from "./forum-service";
import "./CommentForm.scss";

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
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={this.state.title}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea
                className="form-control"
                name="content"
                value={this.state.content}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  };

  //   <form>
  //   <div class="form-group">
  //     <label for="exampleFormControlInput1">Email address</label>
  //     <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
  //   </div>
  //   <div class="form-group">
  //     <label for="exampleFormControlSelect1">Example select</label>
  //     <select class="form-control" id="exampleFormControlSelect1">
  //       <option>1</option>
  //       <option>2</option>
  //       <option>3</option>
  //       <option>4</option>
  //       <option>5</option>
  //     </select>
  //   </div>
  //   <div class="form-group">
  //     <label for="exampleFormControlSelect2">Example multiple select</label>
  //     <select multiple class="form-control" id="exampleFormControlSelect2">
  //       <option>1</option>
  //       <option>2</option>
  //       <option>3</option>
  //       <option>4</option>
  //       <option>5</option>
  //     </select>
  //   </div>
  //   <div class="form-group">
  //     <label for="exampleFormControlTextarea1">Example textarea</label>
  //     <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  //   </div>
  // </form>

  render() {
    return (
      <div>
        <button className="linkButton" onClick={() => this.toggleForm()}>
          Add comment
        </button>
        {this.showAddCommentForm()}
      </div>
    );
  }
}
