import React, { Component } from "react";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={5}
        initialCenter={{
          lat: 40.4893538,
          lng: -3.6827461
        }}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCghO2WIPQf3LLa_ZqqMCDvlh05st8hpgQ"
  // apiKey: (process.env.GoogleApi)
})(MapContainer);
