const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema(
  {
    name: String,
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    picPath: String,
    picName: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
