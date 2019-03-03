const express = require("express");
const forumRoutes = express.Router();
const Thread = require("../models/Thread");
// const cloudinary = require("../options/cloudinary");
const bodyParse = require("body-parser");
const axios = require("axios");

forumRoutes.get("/threads", (req, res, next) => {
  Thread.find({}).then(threads => {
    res.json({ threads });
    console.log(threads);
  });
});

forumRoutes.post(
  "/thread/new",
  // cloudinary.single("photo"),
  (req, res, next) => {
    // const imagePath = req.file.secure_url;
    // const imageName = req.file.originalname;
    Thread.create({
      // creatorId: req.user._id,
      title: req.body.title,
      content: req.body.content
      // picPath: imagePath,
      // picName: imageName
    })
      .then(thread => {
        res.json(thread);
      })
      .catch(() => {
        res.json({ message: "there was an error saving thread" });
      });
  }
);

module.exports = forumRoutes;
