import React, { Component } from "react";
import MapService from "./map-service";
import SearchFormMonths from "./SearchFormMonths";
import SearchFormYears from "./SearchFormYears";

export default class SearchFormCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      species: this.props.species,
      month: "",
      year: "",
      search: ""
    };
    this.service = new MapService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const searchName = this.props.searchName;
    const species = this.state.species;
    const month = this.state.month;
    const year = this.state.year;
    const search = "search2";

    this.service
      .makeNewSearch(searchName, species, month, year, search)
      .then(response => {
        this.props.passFunction(response);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlerFunction = dataFromFormComponents => {
    let { name, value } = dataFromFormComponents.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
      <div className="searchForm">
        <form
          className="form-inline searchform"
          onSubmit={this.handleFormSubmit}
        >
          {this.state.species ? (
            <div className="form-inline searchform">
              <label>Month to compare:</label>
              <SearchFormMonths
                passFunction={this.handlerFunction}
                species={this.state.species}
              />
            </div>
          ) : (
            undefined
          )}

          {this.state.month ? (
            <div className="form-inline searchform">
              <label>Year to compare:</label>
              <SearchFormYears
                passFunction={this.handlerFunction}
                species={this.state.species}
                month={this.state.month}
              />
            </div>
          ) : (
            undefined
          )}

          {this.state.year ? (
            <input
              className="linkButton buttonSearchform"
              type="submit"
              value="submit"
            />
          ) : (
            undefined
          )}
        </form>
      </div>
    );
  }
}
