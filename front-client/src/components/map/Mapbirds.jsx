import React, { Component } from 'react'
import MapContainer from './Mapcontainer';
import data from '../../data.json';

export default class Mapbirds extends Component {
  constructor(props) {
    super(props);
    this.state = { allBirdPoints: data };
  }

  render() {
    return (
      <div>
        <h2>This is Map Birds</h2>
        {/* <button onClick="drawPoints">draw points</button> */}
        <MapContainer allBirdPointsProps={this.state.allBirdPoints}  />
      </div>
    )
  }
}
