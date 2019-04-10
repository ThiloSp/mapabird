import React, { Component } from "react";
import MapContainer from "./Mapcontainer";
import data from "../../data.json";

export default class MapForSearches extends Component {
  constructor(props) {
    super(props);
    this.state = { allBirdPoints: data };
  }

  componentWillMount() {
    let newState = {
      ...this.state
    };
    newState.allBirdPoints = this.props.allBirdPoints;
    this.setState(newState);
    }

  render() {
    console.log(this.state.allBirdPoints)
    return (
      <div>
        <MapContainer allBirdPointsProps={this.state.allBirdPoints} />
      </div>
    );
  }
}
