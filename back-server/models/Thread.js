const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema(
  {
    title: String,
    content: String,
    // creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    // areas: { type: Schema.Types.ObjectId, ref: "Area" },
    // picPath: String,
    // picName: String
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
