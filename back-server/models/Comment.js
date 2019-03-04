const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    title: String,
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    threadId: { type: Schema.Types.ObjectId, ref: "Thread" },
    imagePath: String,
    imageName: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
