const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//const { signAccessToken } = require("../middleware/auth")

const UserSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Types.ObjectId,
    unique: true,
    ref: "Patient"
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    unique: true,
    ref: "Doctor"
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phoneNumber"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 5,
    select: false,
  },
  passwordType: {
    type: String,
    required: [true, "Please add a password type (default, validated"],
  },
  avatar: String,
  isAdmin: Boolean,
  lastConnexion: Date,
  verified: Boolean,
  preferences: Array,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// UserSchema.methods.getSignedJwtToken =  function () {
//   return signAccessToken(this._id);
// };

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
