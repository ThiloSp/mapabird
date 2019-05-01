import React, { Component } from "react";
import MapService from "./map-service";

export default class SaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = { searchName: "" };
    this.service = new MapService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const birdsToSave = this.props.allBirdPoints;
    birdsToSave.forEach(data => (data.searchName = this.state.searchName));
    this.service
      .saveNewSearch(birdsToSave)
      .then(response => {})
      .then(() => {
        this.setState({ searchName: "" });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="searchForm">
        <form
          className="form-inline searchform"
          onSubmit={this.handleFormSubmit}
        >
          <label>Name of your map:</label>
          <input
            className="form-control"
            type="text"
            name="searchName"
            value={this.state.searchName}
            onChange={e => this.handleChange(e)}
          />

          <button
            className="linkButton buttonSearchform"
            type="submit"
            value="submit"
          >
            Save Map
          </button>
        </form>
      </div>
    );
  }
}
