const route = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
route.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    req.body.username = req.body.name + Date.now();
    let newUser = await new user(req.body);
    newUser = await newUser.save();
    res.status(200).json({
      status: "Success",
      data: newUser,
      message: "",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      data: {},
      message: "Cannot Register Your Account!!",
      error: error,
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    user.findOne({ email: req.body.email }, (error, user) => {
      if (error) {
        return res.status(400).json({
          status: "Error",
          data: {},
          message: "Cannot Login to Your Account!!",
          error: error,
        });
      } else if (user) {
        const { password, ...other } = user;
        if (bcrypt.compare(req.body.password, password)) {
          res.status(200).json({
            status: "Success",
            data: other._doc,
            message: "",
            error: null,
          });
        } else {
          res.status(400).json({
            status: "Error",
            data: {},
            message: "Incorrect Password",
            error: null,
          });
        }
      } else {
        return res.status(404).json({
          status: "Error",
          data: {},
          message: "No User Found!!!",
          error: null,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      data: {},
      message: "Cannot Login to Your Account!!",
      error: error,
    });
  }
});
module.exports = route;
