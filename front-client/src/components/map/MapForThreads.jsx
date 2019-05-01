import React, { Component } from "react";
import MapContainer from "./Mapcontainer";
import MapService from "./map-service";
import data from "../../data.json";

export default class MapForThreads extends Component {
  constructor(props) {
    super(props);
    this.state = { allBirdPoints: data };
    this.service = new MapService();
  }

  componentWillReceiveProps() {
    this.getThreadBirds();
  }

  getThreadBirds = () => {
    const searchName = this.props.searchName;
    this.service
      .getBirdsFromBack(searchName)
      .then(response => {
        this.setState({ allBirdPoints: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getThreadBirds();
  }

  render() {
    return (
      <div>
        <MapContainer allBirdPointsProps={this.state.allBirdPoints} />
      </div>
    );
  }
}
