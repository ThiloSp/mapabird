import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    const styleMap = {
      width: '100%',
      height: '50%'
    }

    const markers = this.props.allBirdPointsProps.map((point, idx) => {
      let image = {
        url: "/images/testMarker.png",
       /*  strokeColor: "red", */
        scaledSize: new this.props.google.maps.Size (64,64)
    }
      return <Marker position={point} key={idx} icon={image}/>;
    });

    return (
      
      <Map
        google={this.props.google}
        style = {styleMap}
        zoom={5.5}
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
