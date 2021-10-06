const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const { generateCertificate, checkValidity, generatePair } = require("../utils/rsa");
const redisClient = require("../config/redis");

exports.signAccessToken = (userId, phoneNumber, next) => {
  const userPhoneNumber = generateCertificate(userId, phoneNumber);
  try {
    const generateToken = jwt.sign(
      { id: userPhoneNumber, iss: "philia.com" },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    return generateToken;
  } catch (error) {
    return next(new ErrorResponse("Internal server error", 505));
  }
};

exports.signRefreshToken = (userId, phoneNumber, next) => {
  const userPhoneNumber = generateCertificate(userId, phoneNumber);
  try {
    const generateRefreshToken = jwt.sign(
      { id: userPhoneNumber, iss: "philia.com" },
      process.env.JWT_REFRESHTOKEN_SECRET,
      {
        expiresIn: process.env.JWT_RESFRESHTOKEN_EXPIRE,
      }
    );
    redisClient.SET(
      userPhoneNumber,
      generateRefreshToken,
      "EX",
      7 * 24 * 60 * 60,
      (err, result) => {
        if (err) {
          console.log(err.message);
          return next(new ErrorResponse("Internal server error", 505));
        }
      }
    );
    return generateRefreshToken;
  } catch (error) {
    return next(new ErrorResponse("Internal server error", 505));
  }
};

exports.verifyRefreshToken = (userId, refreshToken, next) => {
  var redisToken;
  try {
    const verifiedToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESHTOKEN_SECRET
    );
    const phoneNumber = checkValidity(userId, verifiedToken.id);
    if (!phoneNumber) {
      return next(
        new ErrorResponse("Not authorized to access this ressources", 401)
      );
    }
    redisClient.GET(phoneNumber, (err, result) => {
      if (err) {
        console.log(err.message);
        return next(new ErrorResponse("Internal server error", 505));
      }
      redisToken = result;
    });
    // if (refreshToken === redisToken) {
    //   return userId;
    // } else {
    //   return next(new ErrorResponse("Not authorized to access this ressources", 401));
    // }
    return phoneNumber;
  } catch (error) {
    return next(new ErrorResponse("Internal server error", 505));
  }
};
