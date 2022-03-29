const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  tribe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tribe"
  }
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
