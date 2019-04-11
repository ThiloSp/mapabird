import axios from "axios";

class MapService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/birds`,
      withCredentials: true
    });
    this.service = service;
  }

  makeNewSearch = (searchName, species, month, year, search) => {
    // console.log("This is searchname: ", searchName);
    // console.log("This is month: ", month);
    // console.log("This is year: ", year);
    return this.service
      .post("/search", { searchName, species, month, year, search })
      .then(response => response.data);
  };

  saveNewSearch = birdsToSave => {
    console.log("this is birdsToSave: ", birdsToSave);
    return this.service
      .post("/save", { birdsToSave })
      .then(response => response.data);
  };

  getBirdsFromBack = searchName => {
    return this.service
      .post("/threadbirds", { searchName })
      .then(response => response);
  };

  getBirdNames = () => {
    return this.service.get("/birdnames").then(response => response.data);
  };

  getMonths = enteredSpecies => {
    // console.log("in service: ", enteredSpecies);
    return this.service
      .post("/months", { enteredSpecies })
      .then(response => response.data);
  };

  getYears = (enteredSpecies, enteredMonth) => {
    // console.log("in service: ", enteredSpecies);
    return this.service
      .post("/years", { enteredSpecies, enteredMonth })
      .then(response => response.data);
  };
}
export default MapService;
