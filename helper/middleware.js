const jwt = require("jsonwebtoken");
const user = require("../Model/usersModel");
const User = require("../Model/usersModel");
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token)
  console.log(token, "token");
  if (!token)
    return res
      .status(401)
      .send({ token: token, message: "You are not Authenticated" });
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
    if (err) {
      return res.status(401).send("Invalid Token! or Token is expired");
    }

    req.user = user;
    next();
  });
};

const verifyTokenActive = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token)
  console.log(token, "token");
  if (!token)
    return res
      .status(401)
      .send({ token: token, message: "You are not Authenticated" });
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
    if (err) {
      res.status(401).send("Invalid Token! or Token is expired");
      next();
    } else {
      req.user = user;
      next();
    }
  });
};

const verifyToken2 = (req, res) => {
  const token = req.cookies.token;
  console.log(token, "token");
  if (!token) return res.status(401).send("You are not Authenticated");
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
    if (err) return res.status(401).send("Invalid Token! or Token is expired");
    req.user = user;
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken2(req, res, next);
  console.log(req.user, "heyu");
  if (req.user.role == "admin") {
    console.log(req.user.admin);
    next();
  } else {
    return res.status(401).send("You are not authorized!");
  }
};
const verifyUser = (req, res, next) => {
  verifyToken2(req, res);
  // console.log(req.user.email, "heyu");

  if (req.user._id === req.params.id || req.user.role === "admin") {
    next();
  } else {
    return res.status(401).send("You are not authorized!");
  }
};

const verifyModel = (req, res, next) => {
  verifyToken2(req, res);
  // console.log(req.user.email, "heyu");
  if (req.user.role === "model" || req.user.role === "admin") {
    next();
  } else {
    return res.status(401).send("You are not authorized!");
  }
};

const verifyId = (req, res) => {
  const token = req.cookies.token;
  console.log(token, "token");
  if (!token) return res.status(401).send("You are not Authenticated");
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
    if (err) return res.status(401).send("Invalid Token! or Token is expired");
    req.user = user;
    next();
  });
};

module.exports = {
  verifyAdmin,
  verifyUser,
  verifyToken,
  verifyId,
  verifyModel,
  verifyToken,
  verifyTokenActive,
};
