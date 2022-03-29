const mongoose = require("mongoose");

const TribeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    default: null
  },
  employee : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  }]
});

const Tribe = mongoose.model("Tribe", TribeSchema);

module.exports = Tribe;
