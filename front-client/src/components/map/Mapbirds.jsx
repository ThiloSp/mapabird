import React, { Component } from "react";
import SearchForm from "./SearchForm";
import SearchForm2 from "./SearchForm2";
import MapForThreads from "./MapForThreads";
import "./Mapbirds.scss";

export default class Mapbirds extends Component {
  constructor(props) {
    super(props);
    this.state = { allBirdPoints: [] };
  }

  handlerFunction = dataFromForm => {
    let newState = {
      ...this.state
    };
    newState.allBirdPoints = dataFromForm[0];
    this.setState(newState);
    console.log(dataFromForm[0].searchName);
    console.log("This is search after search 1:", this.state.allBirdPoints);
  };

  render() {
    return (
      <div>
        <h3 className="title">Map Birds</h3>
        <SearchForm passFunction={this.handlerFunction} />
        {this.state.allBirdPoints.searchName ? (
          <div>
            <SearchForm2
              passFunction={this.handlerFunction}
              searchName={this.state.allBirdPoints.searchName}
              species={this.state.allBirdPoints.sciName}
            />
          </div>
        ) : (
          undefined
        )}
        {this.state.allBirdPoints.searchName ? (
          <div>
            <MapForThreads
              searchName={this.state.allBirdPoints.searchName}
              search={this.state.allBirdPoints.search}
            />
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}
