import React, { Component } from "react";

export default class SearchForm extends Component {
  constructor(){
    super()
    this.state = {search: ""}
  }

  handleChange =(e)=>{
    e.preventDefault();
    console.log(e.target.value)
    let birdPointSearch = e.target.value;
    console.log(birdPointSearch)
    this.props.searchFunction(birdPointSearch)
  }

  render(){
    return(
      <div>
        <input type="text" onChange={e => this.handleChange(e)} placeholder="Search..."></input>
      </div>
    )
  }

}


/* constructor(){
  super()
  this.state = {search: ""}
}

handleChange =(e)=>{
  e.preventDefault();
  let productSearch = e.target.value;
  this.props.searchFunction(productSearch)
}

render(){
  return(
    <div>
      <input type="text" onChange={e => this.handleChange(e)} placeholder="Search..."></input>
    </div>
  )
}

} */