const express = require("express");
const uploads = express.Router();
const uploader = require("../configs/cloudinary-setup");
const User = require("../models/User")

uploads.post("/upload", uploader.single("photoPath"), (req, res, next) => {
  // console.log("file is: ", req.file);
  // console.log("URL is: ", req.file.secure_url);
  // console.log("userID: ", req.body);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

uploads.post("/update", (req, res, next) => {
  console.log("this is req.body: ",req.body)
  const photoPath = req.body.response.secure_url;
  const userId = req.body.userID;
  console.log("this is req.body.secure_url: ",photoPath)
  console.log("this is req.body.userID: ",userId)
  User.findOneAndUpdate(
    { _id: userId },
    { $set: { photoPath: photoPath } },
    { new: true }
  ).then(updateUser => {
    res.status(200).json(updateUser);
  });
});

// router.post('/update', (req, res, next) => {
//   if (req.isAuthenticated()) {
//     const imageUrl = req.body.imageUrl;
//     User.findOneAndUpdate({_id: req.user._id}, { $set: { imageUrl: imageUrl }}, {new:true})
//       .then((updateUser) => {
//         res.status(200).json(updateUser);
//       });
//   }
// });

module.exports = uploads;
