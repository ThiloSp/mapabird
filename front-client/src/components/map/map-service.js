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

  addNewSearch = (searchName, month, year) => {
    console.log("This is searchname: ",searchName)
    console.log("This is month: ", month)
    return this.service
      .post("/", { searchName, month, year })
      .then(response => response.data);
  };

 
}

export default MapService;
