import React, { Component } from "react";
import ReactAutocomplete from "react-autocomplete";
import MapService from "./map-service";

export default class SearchBirdName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: "",
      birdnames: []
    };
    this.service = new MapService();
  }

  componentDidMount = () => {
    this.service.getBirdNames().then(birdnames => {
      const birdArray = birdnames.map((e, i) => {
        return { id: i, label: e };
      });
      this.setState({ ...this.state, birdnames: birdArray });
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const species = this.state.species;
    this.props.passFunction(species);
  };

  render() {
    return (
      <div>
        <form
          className="form-inline searchform"
          onSubmit={this.handleFormSubmit}
        >
          <label>Bird species:</label>
          <ReactAutocomplete
            items={this.state.birdnames}
            shouldItemRender={(item, value) =>
              item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            getItemValue={item => item.label}
            renderItem={(item, highlighted) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: highlighted ? "#eee" : "transparent"
                }}
              >
                {item.label}
              </div>
            )}
            value={this.state.species}
            onChange={e => this.setState({ species: e.target.value })}
            onSelect={species => this.setState({ species })}
          />

          {this.state.species ? (
            <input
              className="linkButton buttonSearchform"
              type="submit"
              value="submit"
            />
          ) : (
            undefined
          )}
        </form>
      </div>
    );
  }
}
