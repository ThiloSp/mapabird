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

  addNewThread = (title, content, creatorId) => {
    return this.service
      .post("/thread/new", { title, content, creatorId })
      .then(response => response.data);
  };

  getThreadDetails = params => {
    return this.service
      .get(`/threads/${params.id}`) //params ok?
      .then(response => response.data);
  };

  addNewComment = (title, content, threadId) => {
    return this.service
      .post("/comment/new", { title, content, threadId })
      .then(response => response.data);
  };

  getCommentDetail = commentId => {
    return this.service
      .post("/comment/details", { commentId })
      .then(response => {
        return response.data;
      });
  };
}

export default ForumService;
