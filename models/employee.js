const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  assignee_id: {
    type: Number,
    default: null,
    unique: true,
  },
  status: {
    type: Boolean,
    default: 0
  },
  password : {
    type: String, 
    default: null
  },
  tribe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tribe"
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Title"
  }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
