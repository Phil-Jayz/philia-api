const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const { checkValidity } = require("../utils/rsa");

exports.protectedRoute = async (req, res, next) => {
  let accessToken;
  const {userId} = req.params;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    accessToken = req.headers.authorization.split(" ")[1];
  }

  if (!accessToken) {
    return next(new ErrorResponse("Not authorized to access this ressources", 401));
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const phoneNumber = checkValidity(userId, decoded.id);
    const user = await User.findOne({phoneNumber: phoneNumber});

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this ressources", 401));
  }
};