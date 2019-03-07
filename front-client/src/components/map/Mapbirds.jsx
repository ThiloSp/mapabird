import React, { Component } from "react";
import MapContainer from "./Mapcontainer";
import data from "../../data.json";
import SearchForm from "./SearchForm";
import SearchForm2 from "./SearchForm2";
import MapForThreads from "./MapForThreads";

export default class Mapbirds extends Component {
  //  constructor(props) {
  //     super(props);
  //     this.state = { searchName: "" };
  //   }

  //   handlerFunction = dataFromForm => {
  //     let newState = {
  //       ...this.state
  //     };
  //     newState.allBirdPoints = dataFromForm;
  //     this.setState(newState);
  //   };

  constructor(props) {
    super(props);
    this.state = { allBirdPoints: [] };
  }

  handlerFunction = dataFromForm => {
    let newState = {
      ...this.state
    };
    newState.allBirdPoints = dataFromForm[0].searchName;
    this.setState(newState);
    console.log(dataFromForm[0].searchName);
    console.log("This is searchName after search 1:", this.state.allBirdPoints);
  };

  render() {
    return (
      <div>
        <h2>This is Map Birds</h2>
        <SearchForm passFunction={this.handlerFunction} />
        {this.state.allBirdPoints ? (
          <div>
            <SearchForm2
              passFunction={this.handlerFunction}
              searchName={this.state.allBirdPoints}
            />
          </div>
        ) : (
          undefined
        )}
        {this.state.allBirdPoints ? (
          <div>
            <MapForThreads searchName={this.state.allBirdPoints} />
          </div>
        ) : (
          undefined
        )}
        {/* {<MapContainer allBirdPointsProps={this.state.allBirdPoints} />} */}
      </div>
    );
  }
}
