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

  getPersonalThreads = userId => {
    return this.service
      .post("/personalthreads", { userId })
      .then(responseDB => responseDB.data);
  };

  addNewThread = (title, content, creatorId, searchName) => {
    return this.service
      .post("/thread/new", { title, content, creatorId, searchName })
      .then(response => response.data);
  };

  deleteThread = (params) => {
    return this.service
      .delete(`/threads/${params.id}`)
      .then(response => response.data);
  };

  

  getThreadDetails = params => {
    return this.service
      .get(`/threads/${params.id}`)
      .then(response => response.data);
  };

  addNewComment = (title, content, threadId, creatorId) => {
    return this.service
      .post("/comment/new", { title, content, threadId, creatorId })
      .then(response => response.data);
  };

  getCommentDetail = commentId => {
    return this.service
      .post("/comment/details", { commentId })
      .then(response => {
        return response.data;
      });
  };

  getUserInfo = creatorId => {
    return this.service
      .post("/comment/userinfo", { creatorId })
      .then(response => {
        return response.data;
      });
  };
}

export default ForumService;
