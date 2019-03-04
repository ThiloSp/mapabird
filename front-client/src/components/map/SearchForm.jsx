import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = event => {
    const { name, value } = event.target;
    console.log(event)
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
          <select name="type" onChange={e => this.handleChange(e)} >
          <option value="january">January</option>
          <option value="february">February</option>
        </select>
      </div>
    );
  }
}
