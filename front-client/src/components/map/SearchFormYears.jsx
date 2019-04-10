import React, { Component } from "react";
import MapService from "./map-service";

export default class SearchFormYears extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.props.month,
      years: []
    };
    this.service = new MapService();
  }
  componentDidMount = () => {
    const enteredSpecies = this.props.species;
    const enteredMonth = this.props.month;
    this.service.getYears(enteredSpecies, enteredMonth).then(years => {
      console.log("returned years: ", years);
      this.setState({ ...this.state, years: years });
    });
  };

  handleChange = event => {
    const { name, value } = event.target; //löschen?
    this.setState({ [name]: value }); //löschen?
    this.props.passFunction(event);
  };

  render() {
    return (
      <div>
        <select
          className="custom-select"
          name="year"
          value={this.state.year}
          onChange={e => this.handleChange(e)}
        >
          <option value="1994">select</option>
          {this.state.years.map((year, idx) => {
            return (
              <option value={year} key={idx}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
