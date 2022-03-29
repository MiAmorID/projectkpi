const mongoose = require("mongoose");

const MilestoneSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: null
  },
  iid: {
    type: Number,
    default: null
  },
  project_id: {
    type: Number,
    default: null
  },
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: null
  },
  updated_at: {
    type: Date,
    default: null
  },
  due_date: {
    type: Date,
    default: null
  },
  start_date: {
    type: Date,
    default: null
  },
  expired: {
    type: Boolean,
    default: false
  },
  web_url : {
    type: String,
    default: null
  }
});

const Milestone = mongoose.model("Milestone", MilestoneSchema);

module.exports = Milestone;
