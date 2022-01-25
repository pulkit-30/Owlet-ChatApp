const route = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

route.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json({
          status: "Error",
          message: "cannot update your account",
          data: {},
          error: error,
        });
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        status: "Success",
        message: "Account has been updated",
        data: user,
        error: null,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        message: "cannot update your account",
        data: {},
        error: error,
      });
    }
  } else {
    return res.status(403).json({
      status: "Error",
      message: "You can update only your account",
      data: {},
      error: null,
    });
  }
});

route.get("/", async (req, res) => {
  const id = req.query.userId;
  const name = req.query.name;
  try {
    const user = id
      ? await User.findOne({ _id: id })
      : await User.find({ name: name });
    if (user) {
      return res.status(200).json({
        status: "Success",
        data: user,
        message: "User found Successfully",
        error: null,
      });
    } else {
      res.status(404).json({
        status: "Error",
        data: {},
        message: "No User found!!!",
        error: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      data: {},
      message: "Cannot find a user!!!",
      error: error,
    });
  }
});

route.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: "Success",
        data: {},
        message: "Account deleted successfully!!!",
        error: null,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        data: {},
        message: "Account cannot deleted successfully!!!",
        error: error,
      });
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

module.exports = route;
