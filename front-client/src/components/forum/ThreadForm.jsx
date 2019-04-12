import React, { Component } from "react";
import ForumService from "./forum-service";

export default class ThreadForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", searchName: "" };
    this.service = new ForumService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const searchName = this.state.searchName;
    const content = this.state.content;
    const creatorId = this.props.userInSession._id;

    // const birdsToSave = this.props.allBirdPoints;
    // birdsToSave.forEach(data => (data.searchName = this.state.searchName);
    this.service
    // .saveNewSearch(birdsToSave)
    // .then(response => {
    //   // console.log("saveresponse is: ", response);
    // })
    .addNewThread(title, content, creatorId, searchName)
      .then(() => {
        this.setState({
          title: "",
          content: "",
          searchName: ""
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="formBoxCenterParent">
        <div className="formBoxCenter">
          <h2>New Thread</h2>
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
              <label>Query you want to show:</label>
              <input
                className="form-control"
                type="text"
                name="searchName"
                value={this.state.searchName}
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
            <input className="linkButton" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
