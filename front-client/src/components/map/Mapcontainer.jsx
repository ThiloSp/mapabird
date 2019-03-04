import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    const markers = this.props.allBirdPointsProps.map((point, idx) => {
      return <Marker position={point} key={idx} />;
    });

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
        {/* <Marker position={{ lat: 44.05, lng: -3.02 }} /> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.GMAPS_KEY
})(MapContainer);
