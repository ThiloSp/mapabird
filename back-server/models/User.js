const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    photoPath: { type: String, default: '../../images/user.png' },
    photoName: String,
    threads: [{ type: Schema.Types.ObjectId, ref: "Thread" }],
    areas: [{ type: Schema.Types.ObjectId, ref: "Area" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("User", UserSchema);
