const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const accessTokenExpires = 3600 * 24 * 7;
const refreshTokenExpires = 3600 * 24 * 7;

const createToken = (id, expiresTime) => {
  return jwt.sign({ id }, "newone", {
    expiresIn: expiresTime,
  });
};

const generateAuthToken = async (user) => {
  const token = createToken(user.id, accessTokenExpires);
  const refreshtoken = createToken(user.id, refreshTokenExpires);
  return { accesstoken: token, refreshToken: refreshtoken };
};

const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password, role, shipperArea } = req.body;
  const user = await User.find({ email: email });
  const NameUser = await User.find({ name: name });
  if (user.length > 0) {
    res.status(201).json({ exist: 1 });
  } else if (NameUser.length > 0) {
    res.status(201).json({ exist: 2 });
  } else {
    if (shipperArea && shipperArea.length > 0) {
      try {
        const user = await User.create({
          name,
          email,
          password,
          role,
          shipperArea,
        });
        const token = await generateAuthToken(user);
        res.status(201).json({ user, token: token });
      } catch (error) {
        console.log(error);
        res.status(400).send("error, user not created");
      }
    } else {
      try {
        const user = await User.create({ name, email, password, role });
        const token = await generateAuthToken(user);
        res.status(201).json({ user, token: token });
      } catch (error) {
        console.log(error);
        res.status(400).send("error, user not created");
      }
    }
  }
};
const checkPassword = async (req, res) => {
  const { curUserPassword, email } = req.body;

  try {
    const user = await User.login(email, curUserPassword);
    if (user !== null) {
      res.status(201).json({ password: 1 });
    } else {
      res.status(201).json({ exists: 0, status: "cannot find user" });
    }
  } catch (error) {
    console.log(error);
    if (error.error == "Wrong password") res.status(400).send({ password: 0 });
    else if (error.error == "Dont exists") res.status(400).send({ exists: 0 });
    else res.status(400).send("error, cannot find account");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user == null) {
      res.status(201).json({ exists: 0, status: "cannot find user" });
    } else {
      const token = await generateAuthToken(user);
      res.status(201).json({ user, token: token });
    }
  } catch (error) {
    console.log(error);
    if (error.error == "Wrong password") res.status(400).send({ password: 0 });
    else if (error.error == "Dont exists") res.status(400).send({ exists: 0 });
    else res.status(400).send("error, cannot find account");
  }
};

const authenticateToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "newone", (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};

module.exports = {
  register,
  login,
  authenticateToken,
  checkPassword,
};
