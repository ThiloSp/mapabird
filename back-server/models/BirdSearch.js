const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BirdsearchSchema = new Schema(
  {
    searchName: String,
    comName: String,
    sciName: String,
    lat: Number,
    lng: Number,
    search: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Birdsearch", BirdsearchSchema);
