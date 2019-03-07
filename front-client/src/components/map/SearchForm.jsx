import React, { Component } from "react";
import MapService from "./map-service";
import ReactAutocomplete from "react-autocomplete";

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
      .addNewSearch(searchName, species, month, year, search)
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

  render() {
    return (
      <div>
        <div>
          <h4>First Query</h4>
        </div>
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label>Name of your query:</label>
            <input
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
            <select
              name="month"
              value={this.state.month}
              onChange={e => this.handleChange(e)}
            >
              <option value="00">select</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <label>Year:</label>
            <select
              name="year"
              value={this.state.year}
              onChange={e => this.handleChange(e)}
            >
              <option value="1994">select</option>
              <option value="1995">1995</option>
              <option value="1996">1996</option>
              <option value="1997">1997</option>
              <option value="1998">1998</option>
              <option value="1999">1999</option>
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2008">2008</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
            </select>

            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}

{
  /* <label>Bird species:</label>
            <input
              type="text"
              name="species"
              value={this.state.species}
              onChange={e => this.handleChange(e)}
            /> */
}

{
  /* <label>Month:</label>
            <input
              type="text"
              name="month"
              value={this.state.month}
              onChange={e => this.handleChange(e)}
            />  */
}

{
  /* <label>Year:</label>
            <input
              type="text"
              name="year"
              value={this.state.year}
              onChange={e => this.handleChange(e)}
            /> */
}

{
  /* <label>Month:</label>
            <select
              name="month"
              value={this.state.month}
              onChange={e => this.handleChange(e)}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">JDecember</option>
            </select> */
}
