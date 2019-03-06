import React, { Component } from "react";
import MapService from "./map-service";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { searchName: "", species: "", month: "", year: "" };
    this.service = new MapService();
  }

  handleFormSubmit = event => {
    // console.log("state is now1: ", this.state);
    event.preventDefault();
    const searchName = this.state.searchName;
    const species = this.state.species;
    const month = this.state.month;
    const year = this.state.year;

    this.service
      .addNewSearch(searchName, species, month, year)
      .then(response => {
        // console.log("searchresponse is: ", response);
        this.props.passFunction(response);
      })
      .then(() => {
        this.setState({
          searchName: "",
          species: "",
          month: "",
          year: ""
        });
        console.log("state is now2: ", this.state);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div>
          <h2>Bird Search Form</h2>
        </div>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label>Name of your query:</label>
            <input
              type="text"
              name="searchName"
              value={this.state.searchName}
              onChange={e => this.handleChange(e)}
            />
            <label>Bird species:</label>
            <input
              type="text"
              name="species"
              value={this.state.species}
              onChange={e => this.handleChange(e)}
            />

            <label>Month:</label>
            <select
              name="month"
              value={this.state.month}
              onChange={e => this.handleChange(e)}
            >
              <option value="0">select</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">JDecember</option>
            </select>

            <label>Year:</label>
            <input
              type="text"
              name="year"
              value={this.state.year}
              onChange={e => this.handleChange(e)}
            />
            <input type="submit" value="Signup" />
          </form>
        </div>
      </div>
    );
  }
}

{
  /* <label>Month:</label>
            <input
              type="text"
              name="month"
              value={this.state.month}
              onChange={e => this.handleChange(e)}
            />  */
}

{
  /* <label>Month:</label>
            <select
              name="month"
              value={this.state.month}
              onChange={e => this.handleChange(e)}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">JDecember</option>
            </select> */
}
