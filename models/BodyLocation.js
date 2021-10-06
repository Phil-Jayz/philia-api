const mongoose = require("mongoose");

const BodyLocationSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: [true, "Please provide an ID"],
    unique: true,
  },
  Name: {
    type: String,
    required: [true, "Please provide a name"]
  },
  Location: Array
});

const BodyLocation = mongoose.model("BodyLocation", BodyLocationSchema);

module.exports = BodyLocation;
