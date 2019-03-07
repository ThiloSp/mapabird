/* import React, { Component } from "react";
import MapService from "./map-service";
import ReactAutocomplete from "react-autocomplete";
import "./S"

export default class SearchBar extends Component {
  constructor(){
    super()
    this.state = {search: ""}
    this.service = new MapService();
  }

  

  render(){
    return(
      <div>
        <ReactAutocomplete
              items={this.states.birdnames}
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
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
              onSelect={value => this.setState({ value })}
            />
      </div>
    )
  }

}
 */

