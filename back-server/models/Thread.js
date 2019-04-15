const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema(
  {
    title: String,
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    searchName: String,
    infoDisplay: String,
    dateSearch1:[],
    dateSearch2: []
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Thread = mongoose.model("Thread", threadSchema);
module.exports = Thread;
