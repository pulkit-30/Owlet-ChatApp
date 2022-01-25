const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      require: true,
      min: 2,
      max: 25,
    },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "default.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
