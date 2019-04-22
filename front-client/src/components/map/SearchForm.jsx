import React, { Component } from "react";
import MapService from "./map-service";
import "./SearchForm.scss";
import SearchFormMonths from "./SearchFormMonths";
import SearchFormYears from "./SearchFormYears";
import SearchBirdName from "./SearchBirdName";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      species: "",
      month: "",
      year: "",
      search: ""
    };
    this.service = new MapService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const searchName = this.state.searchName;
    const species = this.state.species;
    const month = this.state.month;
    const year = this.state.year;
    const search = "search1";

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

  handlerFunctionSpecies = dataFromFormComponents => {
    this.setState({ ...this.state, species: dataFromFormComponents });
  };

  render() {
    return (
      <div>
        <div className="birdName">
          <SearchBirdName passFunction={this.handlerFunctionSpecies} />
        </div>
        <div className="searchForm">
          <form
            className="form-inline searchform"
            onSubmit={this.handleFormSubmit}
          >
            {this.state.species ? (
              <div className="form-inline searchform">
                <label>Month:</label>
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
                <label>Year:</label>
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
      </div>
    );
  }
}
