import React, { Component } from "react";
import MapService from "./map-service";
import ReactAutocomplete from "react-autocomplete";
import "./SearchForm.scss";
import SearchFormMonths from "./SearchFormMonths";
import SearchFormYears from "./SearchFormYears";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      species: "",
      month: "",
      year: "",
      search: "",
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
    // console.log("state is now1: ", this.state);
    event.preventDefault();
    const searchName = this.state.searchName;
    const species = this.state.species;
    const month = this.state.month;
    const year = this.state.year;
    const search = "search1";

    this.service
      .makeNewSearch(searchName, species, month, year, search)
      // .addNewSearch(searchName, species, month, year, search)
      .then(response => {
        console.log("searchresponse is: ", response);
        this.props.passFunction(response);
      })
      .then(() => {
        this.setState({
          searchName: "",
          species: "",
          month: "",
          year: "",
          search: "",
          birdnames: []
        });
        // console.log("state is now2: ", this.state);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlerFunction = dataFromFormComponents => {
    let { name, value } = dataFromFormComponents.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    // console.log("this.state: ", this.state);
    return (
      <div className="searchForm">
        <form
          className="form-inline searchform"
          onSubmit={this.handleFormSubmit}
        >
          <label>Name of your query:</label>
          <input
            className="form-control"
            type="text"
            name="searchName"
            value={this.state.searchName}
            onChange={e => this.handleChange(e)}
          />

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

          <label>Month:</label>
          {this.state.species ? (
            <SearchFormMonths
              passFunction={this.handlerFunction}
              species={this.state.species}
            />
          ) : (
            undefined
          )}

          <label>Year:</label>
          {this.state.month ? (
            <SearchFormYears
              passFunction={this.handlerFunction}
              species={this.state.species}
              month={this.state.month}
            />
          ) : (
            undefined
          )}

          <input
            className="linkButton buttonSearchform"
            type="submit"
            value="submit"
          />
        </form>
      </div>
    );
  }
}
