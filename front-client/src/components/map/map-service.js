import axios from "axios";

class MapService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/birds`,
      withCredentials: true
    });
    this.service = service;
  }

  // getAllThreads = () => {
  //   return this.service.get("/threads").then(responseDB => responseDB.data);
  // };

  addNewSearch = (searchName, species, month, year, search) => {
    console.log("This is searchname: ", searchName);
    console.log("This is month: ", month);
    console.log("This is year: ", year);
    return this.service
      .post("/", { searchName, species, month, year, search })
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
}
export default MapService;
