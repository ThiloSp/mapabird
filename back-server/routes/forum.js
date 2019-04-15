const express = require("express");
const forumRoutes = express.Router();
const Thread = require("../models/Thread");
const Comment = require("../models/Comment");
const User = require("../models/User");
const bodyParse = require("body-parser");

forumRoutes.get("/threads", (req, res, next) => {
  Thread.find({}).then(threads => {
    res.json({ threads });
  });
});

forumRoutes.post("/personalthreads", (req, res, next) => {
  Thread.find({ creatorId: req.body.userId }).then(threads => {
    res.json({ threads });
  });
});

forumRoutes.post("/thread/new", (req, res, next) => {
  Thread.create({
    content: req.body.content,
    comments: [],
    creatorId: req.body.creatorId,
    searchName: req.body.searchName,
    infoDisplay: req.body.infoDisplay,
    dateSearch1: req.body.dateSearch1,
    dateSearch2: req.body.dateSearch2
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
    .populate("creatorId")
    // .populate('comments')
    .then(thread => {
      res.status(200).json(thread);
    })
    .catch(() => {
      res.json({ message: "there was an error finding thread" });
    });
});

forumRoutes.post("/comment/new", (req, res, next) => {
  Comment.create({
    title: req.body.title,
    content: req.body.content,
    threadId: req.body.threadId,
    creatorId: req.body.creatorId
  })
    .then(response => {
      Thread.findByIdAndUpdate(req.body.threadId, {
        $push: { comments: response._id }
      })
        .then(theResponse => {
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
  User.findById(req.body.creatorId)
    .then(theUser => {
      res.json(theUser);
    })
    .catch(err => {
      res.json(err);
    });
});

forumRoutes.delete("/threads/:id", (req, res, next) => {
  Thread.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Thread with ${req.params.id} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = forumRoutes;
