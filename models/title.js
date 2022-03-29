
const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    default: null
  },
  point: {
    type: Number,
    default: 0
  },
  tribe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tribe"
  }
});

const Role = mongoose.model("Title", TitleSchema);

module.exports = Role;
