const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const birdSchema = new Schema({},
  {
      strict: false
  });

module.exports = mongoose.model('Bird', birdSchema);

