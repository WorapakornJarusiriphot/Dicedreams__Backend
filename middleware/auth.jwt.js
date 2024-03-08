const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const {TokenExpiredError} = jwt;

const catchError = (err , res) => {
  if(err instanceof TokenExpiredError) {
    return res.status(401).send({message : "auth.jwt.js : Unauthorized! Access Token was expired"});
  }
  return res.status(401).send({message : "auth.jwt.js : Unauthorized!"});
};

verifyToken = (req, res, next) => {
  console.log("auth.jwt.js : ",req.headers);
  let token = req.headers["x-access-token"];
  console.log("auth.jwt.js : ",token);
  // console.log(req);
  // console.log(res);
  // console.log(next);

  if (!token) {
    return res.status(403).send({ message: "auth.jwt.js : No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err,res);
      // res.status(401).send({
      //   message: "Unauthorized!",
      // });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  //SELECT * FROM users WHERE id = req.userId
  User.findByPk(req.userId).then((user) => {
    //SELECT * FROM roles, users, users_roles WHERE user.id = users_roles.userId and role.id = users_roles.roleId
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "auth.jwt.js : Require Admin Role!" });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  //SELECT * FROM users WHERE id = req.userId
  User.findByPk(req.userId).then((user) => {
    //SELECT * FROM roles, users, users_roles WHERE user.id = users_roles.userId and role.id = users_roles.roleId
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "auth.jwt.js : Require Moderator Role!" });
      return;
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  //SELECT * FROM users WHERE id = req.userId
  User.findByPk(req.userId).then((user) => {
    //SELECT * FROM roles, users, users_roles WHERE user.id = users_roles.userId and role.id = users_roles.roleId
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "auth.jwt.js : Require Moderator Role!" });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;