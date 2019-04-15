import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import SearchFormCompare from "./SearchFormCompare";
import "./Mapbirds.scss";
import MapForSearches from "./MapForSearches";
import ThreadForm from "../forum/ThreadForm";

export default class Mapbirds extends Component {
  constructor(props) {
    super(props);
    this.state = { allBirdPoints: [] };
  }

  handlerFunction = dataFromForm => {
    let newState = {
      ...this.state
    };
    dataFromForm.forEach(data => newState.allBirdPoints.push(data));
    this.setState(newState);
  };

  renderSaveForm = () => {
    if (this.props.userInSession) {
      return (
        <div className="searchForm">
          <ThreadForm
            allBirdPoints={this.state.allBirdPoints}
            userInSession={this.props.userInSession}
          />
        </div>
      );
    } else {
      return (
        <div className="searchForm">
          <Link className="linkButton" to={"/login"}>
            Please log in to save your maps
          </Link>
        </div>
      );
    }
  };

  render() {
    console.log("this.state.allBirdPoints:", this.state.allBirdPoints);
    return (
      <div>
        <h3 className="title">Map Birds</h3>
        <SearchForm passFunction={this.handlerFunction} />
        {this.state.allBirdPoints[0] ? (
          <div>
            <SearchFormCompare
              passFunction={this.handlerFunction}
              searchName={this.state.allBirdPoints[0].searchName}
              species={this.state.allBirdPoints[0].sciName}
            />
          </div>
        ) : (
          undefined
        )}
        {this.state.allBirdPoints[0] ? (
          <div>{this.renderSaveForm()}</div>
        ) : (
          undefined
        )}
        {this.state.allBirdPoints[0] ? (
          <div>
            <MapForSearches allBirdPoints={this.state.allBirdPoints} />
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}
