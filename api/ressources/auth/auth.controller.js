const crypto = require("crypto");
const ErrorResponse = require("../../../utils/errorResponse");
const User = require("../../../models/User");
const sendEmail = require("../../../utils/sendEmail");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} = require("../../../middleware/auth");
const { generatePair, generateUserPath } = require('../../../utils/rsa');

const redisClient = require("../../../config/redis");

// @desc    Login user
exports.adminlogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    user.lastConnexion = Date.now();
    await user.save();

    sendToken(user._id, user.phoneNumber, 200, res, next);
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
exports.userlogin = async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  // Check if email and password is provided
  if (!phoneNumber || !password) {
    return next(
      new ErrorResponse("Please provide a phoneNumber and pincode", 400)
    );
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ phoneNumber }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    user.lastConnexion = Date.now();
    await user.save();

    sendToken(user._id, user.phoneNumber, 200, res, next);
  } catch (err) {
    next(err);
  }
};

// @desc    Register user
exports.registerAdmin = async (req, res, next) => {
  const { email, phoneNumber, password, passwordType } = req.body;

  try {
    const user = await User.create({
      email,
      phoneNumber,
      password,
      passwordType,
      isAdmin: true,
      verified: false,
      preferences: {
        language: "english",
        currency: "usd",
        paymentMethod: "card",
        timezone: "UTC",
      },
    });
    generatePair(user._id);
    res.status(201).json({ sucess: true, info: "Your philia account was successfully registered", data: user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  const { phoneNumber, password, passwordType } = req.body;

  try {
    const user = await User.create({
      phoneNumber,
      password,
      passwordType,
      isAdmin: false,
      verified: false,
      preferences: {
        language: "english",
        currency: "usd",
        paymentMethod: "card",
        timezone: "UTC",
      },
    });

    
    generatePair(user._id);
    res.status(201).json({ sucess: true, info: "Your philia account was successfully registered", data: user });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// @desc    Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      accessToken: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

// @desc users data
exports.getById = async (req, res, next) => {
  const { _id } = req.params;
  User.find({ _id }).populate({ path: "patienId", model: "Patient" }).exec((err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json({ success: true, data: user });
    }
  });
};

exports.getAll = async (req, res, next) => {
  User.find({}).populate({ path: "patienId", model: "Patient" }).exec((err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json({ success: true, data: user });
    }
  });
};

exports.sendRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next(
        new ErrorResponse("Not authorized to access this ressources", 401)
      );
    }
    const phoneNumber = verifyRefreshToken(refreshToken, next);
    sendToken(phoneNumber, 200, res, next);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next(
        new ErrorResponse("Not authorized to access this ressources", 401)
      );
    }
    //const userId = verifyRefreshToken(refreshToken, next);
    redisClient.DEL("philia", (err, result) => {
      if (err) {
        console.log(err.message);
        return next(new ErrorResponse("Internal server error", 505));
      }
    });
    res.status(204);
  } catch (error) {
    next(error);
  }
};

const sendToken = (userId, phoneNumber, statusCode, res, next) => {
  const accessToken = signAccessToken(userId, phoneNumber, next);
  const refreshToken = signRefreshToken(userId, phoneNumber, next);
  res.status(statusCode).json({ sucess: true, accessToken, refreshToken });
};
