import React, { Component } from 'react'
import MapContainer from './Mapcontainer';
import data from '../../data.json';
import SearchForm from '../search/SearchForm';

export default class Mapbirds extends Component {
  constructor(props) {
    super(props);
    this.state = { allBirdPoints: data };
  }

  handlerFunction = (query) => {
    let newState = {
      ...this.state
    };

    newState.allBirdPoints = this.state.allBirdPoints.filter(birdPoint => {
      return birdPoint.sciName.toLowerCase().startsWith(query.toLowerCase());
    });

    this.setState(newState);
  };


  render() {
    return (
      <div>
        <h2>This is Map Birds</h2>
        <SearchForm searchFunction={this.handlerFunction} />
        <MapContainer allBirdPointsProps={this.state.allBirdPoints}  />
      </div>
    )
  }
}
