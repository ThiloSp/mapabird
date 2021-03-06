import React, { Component } from "react";
import MapService from "./map-service";

export default class SearchFormMonths extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: []
    };
    this.service = new MapService();
  }
  componentDidMount = () => {
    const enteredSpecies = this.props.species;
    this.service.getMonths(enteredSpecies).then(months => {
      this.setState({ ...this.state, months: months });
    });
  };

  handleChange = event => {
    this.props.passFunction(event);
  };

  render() {
    return (
      <div>
        <select
          className="custom-select"
          name="month"
          value={this.state.month}
          onChange={e => this.handleChange(e)}
        >
          <option value="00">select</option>
          {this.state.months.map((month, idx) => {
            return (
              <option value={month} key={idx}>
                {month}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
