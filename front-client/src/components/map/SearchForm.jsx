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
            <input
              type="text"
              name="month"
              value={this.state.month}
              onChange={e => this.handleChange(e)}
            />

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

// <select
//   multiple={true}
//   value={this.state.vale}
//   onChange={this.handleChange}
// >
//   <option value="grapefruit">Grapefruit</option>
//   <option value="lime">Lime</option>
//   <option value="coconut">Coconut</option>
//   <option value="mango">Mango</option>
// </select>
