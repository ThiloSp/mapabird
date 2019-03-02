import React, { Component } from 'react'
import MapContainer from './Mapcontainer';

export default class Mapbirds extends Component {
  
  render() {
    return (
      <div>
        <h2>This is Map Birds</h2>
        {/* <button onClick="drawPoints">draw points</button> */}
        <MapContainer />
      </div>
    )
  }
}
