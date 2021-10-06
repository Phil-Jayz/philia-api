const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: [true, "Please provide an ID"],
    unique: true,
  },
  Name: {
    type: String,
    required: [true, "Please provide a name"]
  }
});

const Issue = mongoose.model("Issue", IssueSchema);

module.exports = Issue;
