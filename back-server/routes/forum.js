const express = require("express");
const forumRoutes = express.Router();
const Thread = require("../models/Thread");
const Comment = require("../models/Comment")
// const cloudinary = require("../options/cloudinary");
const bodyParse = require("body-parser");

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
      content: req.body.content,
      comments: []
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

forumRoutes.get("/threads/:id", (req, res, next) => {
  Thread.findById(req.params.id)
    // .populate('comments')
    .then(thread => {
      res.status(200).json(thread);
    })
    .catch(() => {
      res.json({ message: "there was an error finding thread" });
    });
});

forumRoutes.post("/comment/new", (req, res, next) => {
  console.log("req.body: ",req.body)
  Comment.create({
    title: req.body.title,
    content: req.body.content,
    threadId: req.body.threadId
  })
    .then(response => {
      console.log("response: ",response)
      Thread.findByIdAndUpdate(req.body.threadId, {
        $push: { comments: response._id }
      })
        .then(theResponse => {
          console.log("theResponse: ",theResponse)
          res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});

forumRoutes.post('/comment/details', (req, res, next) => {
  console.log("comment-details req.body: ",req.body)
  Comment.findById(req.body.commentId)
  .then(theTask =>{
      res.json(theTask);
      console.log(theTask);
  })
  .catch( err =>{
      res.json(err);
  })
});

module.exports = forumRoutes;
