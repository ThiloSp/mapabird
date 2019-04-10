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
    // console.log("state is now1: ", this.state);
    console.log(this.props.searchName);
    event.preventDefault();
    const searchName = this.props.searchName;
    const species = this.state.species;
    const month = this.state.month;
    const year = this.state.year;
    const search = "search2";

    this.service
      .makeNewSearch(searchName, species, month, year, search)
      // .addNewSearch(searchName, species, month, year, search)
      .then(response => {
        // console.log("searchresponse is: ", response);
        this.props.passFunction(response);
      })
      .then(() => {
        this.setState({
          searchName: "",
          species: "",
          month: "",
          year: "",
          search: ""
        });
        // console.log("state is now2: ", this.state);
      })
      .catch(error => console.log(error));
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
          <label>Month to compare:</label>
          {this.state.species ? (
            <SearchFormMonths
              passFunction={this.handlerFunction}
              species={this.state.species}
            />
          ) : (
            undefined
          )}

          <label>Year to compare:</label>
          {this.state.month ? (
            <SearchFormYears
              passFunction={this.handlerFunction}
              species={this.state.species}
              month={this.state.month}
            />
          ) : (
            undefined
          )}

          <input
            className="linkButton buttonSearchform"
            type="submit"
            value="submit"
          />
        </form>
      </div>
    );
  }
}
