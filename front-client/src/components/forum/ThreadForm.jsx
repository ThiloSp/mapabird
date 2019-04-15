import React, { Component } from "react";
import ForumService from "./forum-service";
import MapService from "../map/map-service";

export default class ThreadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      searchName: "",
      isShowing: false
    };
    this.forumService = new ForumService();
    this.mapService = new MapService();
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const searchName = this.state.searchName;
    const content = this.state.content;
    const creatorId = this.props.userInSession._id;
    const birdsToSave = this.props.allBirdPoints;
    const dateSearch1 = [];
    const dateSearch2 = [];
    birdsToSave.forEach(data => {
      data.searchName = this.state.searchName;
      if (data.search === "search1" && !dateSearch1.includes(data.date))
        dateSearch1.push(`${data.date}`);
      else if (data.search === "search2" && !dateSearch2.includes(data.date))
        dateSearch2.push(`${data.date}`);
    });
    const infoDisplay = `${this.props.allBirdPoints[0].comName} (${
      this.props.allBirdPoints[0].sciName
    })`;

    this.mapService.saveNewSearch(birdsToSave).then(response => {
      // console.log("saveresponse is: ", response);
    });
    this.forumService
      .addNewThread(
        content,
        creatorId,
        searchName,
        infoDisplay,
        dateSearch1,
        dateSearch2
      )
      .then(() => {
        this.setState({
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
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label>Title:</label>
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
            <button
              className="linkButton buttonSearchform"
              type="submit"
              value="submit"
            >
              Save
            </button>
          </form>
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
        {!this.state.isShowing ? (
          <button className="linkButton" onClick={() => this.toggleForm()}>
            Save new Thread
          </button>
        ) : (
          undefined
        )}
        {this.showMakeNewThreadForm()}
      </div>
    );
  }
}
