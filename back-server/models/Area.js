const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = new Schema(
  {
    name: String,
    // coordinates
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Area", AreaSchema);
