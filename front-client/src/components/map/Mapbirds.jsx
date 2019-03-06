import React, { Component } from "react";
import MapContainer from "./Mapcontainer";
import data from "../../data.json";
import SearchForm from "./SearchForm";
import SearchForm2 from "./SearchForm2";

export default class Mapbirds extends Component {
  constructor(props) {
    super(props);
    this.state = { allBirdPoints: data };
  }

  handlerFunction = dataFromForm => {
    let newState = {
      ...this.state
    };
    newState.allBirdPoints = dataFromForm;
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <h2>This is Map Birds</h2>
        <SearchForm passFunction={this.handlerFunction} />
        <SearchForm2 passFunction={this.handlerFunction} />
        <MapContainer allBirdPointsProps={this.state.allBirdPoints} />
      </div>
    );
  }
}
