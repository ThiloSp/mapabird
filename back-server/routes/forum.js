const express = require("express");
const forumRoutes = express.Router();
const Thread = require("../models/Thread");
const Comment = require("../models/Comment");
const User = require("../models/User");
// const cloudinary = require("../options/cloudinary");
const bodyParse = require("body-parser");

forumRoutes.get("/threads", (req, res, next) => {
  Thread.find({}).then(threads => {
    res.json({ threads });
    console.log(threads);
  });
});

forumRoutes.post("/personalthreads", (req, res, next) => {
  console.log("This is user.id: ", req.body);
  Thread.find({ creatorId: req.body.userId }).then(threads => {
    res.json({ threads });
    console.log("this is personal threads: ", threads);
  });
});

forumRoutes.post("/thread/new", (req, res, next) => {
  Thread.create({
    title: req.body.title,
    content: req.body.content,
    comments: [],
    creatorId: req.body.creatorId,
    searchName: req.body.searchName
  })
    .then(thread => {
      res.json(thread);
    })
    .catch(() => {
      res.json({ message: "there was an error saving thread" });
    });
});

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
  console.log("req.body: ", req.body);
  Comment.create({
    title: req.body.title,
    content: req.body.content,
    threadId: req.body.threadId,
    creatorId: req.body.creatorId
  })
    .then(response => {
      console.log("response: ", response);
      Thread.findByIdAndUpdate(req.body.threadId, {
        $push: { comments: response._id }
      })
        .then(theResponse => {
          console.log("theResponse: ", theResponse);
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

forumRoutes.post("/comment/details", (req, res, next) => {
  // console.log("comment-details req.body: ",req.body)
  Comment.findById(req.body.commentId)
    .then(theComment => {
      res.json(theComment);
      // console.log(theComment);
    })
    .catch(err => {
      res.json(err);
    });
});

forumRoutes.post("/comment/userinfo", (req, res, next) => {
  console.log("comment-getUserInfo-details req.body: ", req.body);
  User.findById(req.body.creatorId)
    .then(theUser => {
      res.json(theUser);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = forumRoutes;
