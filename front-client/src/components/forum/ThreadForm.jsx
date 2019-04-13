import React, { Component } from "react";
import ForumService from "./forum-service";
import MapService from "../map/map-service";

export default class ThreadForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", searchName: "", isShowing: false };
    this.forumService = new ForumService();
    this.mapService = new MapService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const searchName = this.state.searchName;
    const content = this.state.content;
    const creatorId = this.props.userInSession._id;

    const birdsToSave = this.props.allBirdPoints;
    birdsToSave.forEach(data => (data.searchName = this.state.searchName));
    this.mapService.saveNewSearch(birdsToSave).then(response => {
      // console.log("saveresponse is: ", response);
    });
    this.forumService
      .addNewThread(title, content, creatorId, searchName)
      .then(() => {
        this.setState({
          title: "",
          content: "",
          searchName: "",
          isShowing: false
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  showMakeNewThreadForm = () => {
    if (this.state.isShowing) {
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
  };

  toggleForm = () => {
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  };

  render() {
    return (
      <div>
        <button className="linkButton" onClick={() => this.toggleForm()}>
          Save new Thread
        </button>
        {this.showMakeNewThreadForm()}
      </div>
    );
  }
}
