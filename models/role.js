const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    default: null
  }
});

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
