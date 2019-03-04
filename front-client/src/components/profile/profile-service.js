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
    console.log("file in service: ", theFile);
    return this.service.post("/upload", theFile) //put?
    .then(res => res.data);
  }

  // updatePhotoProfile = photo => {
  //   return this.loggedin().then(user => {
  //     user.imageUrl = photo.imageUrl;
  //     return this.service.post("/update", user)
  //     .then(res => res.data)
  //   })
  // }
}

export default ProfileService;
