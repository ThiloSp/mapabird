import axios from "axios";

class ForumService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/forum`,
      withCredentials: true
    });
    this.service = service;
  }

  getAllThreads = () => {
    return this.service.get("/threads").then(responseDB => responseDB.data);
  };

  addNewThread = (title, content) => {
    return this.service
      .post("/thread/new", { title, content })
      .then(response => response.data);
  };

  getThreadDetails = (params) => {
    return this.service
      .get(`/threads/${params.id}`) //params ok?
      .then(response => response.data);
  };
}

export default ForumService;
