import axios from "axios";

class ProfileService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/uploads`,
      withCredentials: true
    });
    this.service = service;
  }

  handleUpload(theFile) {
    // console.log("file in service: ", theFile);
    return this.service.post("/upload", theFile).then(res => res.data);
  }

  updatePhotoProfile = (response, userID) => {
    // console.log("this is photo: ",response, userID)
    return this.service
      .put("/update", { response, userID })
      .then(res => res.data);
  };
}

export default ProfileService;
