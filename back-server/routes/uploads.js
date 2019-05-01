const express = require("express");
const uploads = express.Router();
const uploader = require("../configs/cloudinary-setup");
const User = require("../models/User");

uploads.post("/upload", uploader.single("photoPath"), (req, res, next) => {
  // console.log("file is: ", req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

uploads.put("/update", (req, res, next) => {
  const photoPath = req.body.response.secure_url;
  const userId = req.body.userID;
  User.findOneAndUpdate(
    { _id: userId },
    { $set: { photoPath: photoPath } },
    { new: true }
  ).then(updateUser => {
    res.status(200).json(updateUser);
  });
});

module.exports = uploads;
