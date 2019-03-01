const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    photoPath: String,
    photoName: String,
    topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("User", UserSchema);
