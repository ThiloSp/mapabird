import React, { Component } from "react";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    const points = [
      { lat: 41.02, lng: -3.01 },
      { lat: 42.03, lng: -3.02 },
      { lat: 43.03, lng: -3.04 },
      { lat: 44.05, lng: -3.02 }
    ];

    const markers = points.map((point , idx) => {
      return <Marker position={ point } key={idx}/>
    });
    console.log(markers)

    return (
      <Map
        google={this.props.google}
        zoom={5}
        initialCenter={{
          lat: 40.4893538,
          lng: -3.6827461
        }}
      >
        {markers}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "APiKey"
})(MapContainer);
