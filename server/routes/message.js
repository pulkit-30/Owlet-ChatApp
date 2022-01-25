const route = require("express").Router();
const message = require("../models/message");
route.post("/new", async (req, res) => {
  try {
    const newMessage = await new message(req.body);
    await newMessage.save();
    res.status(200).json({
      status: "Success",
      data: newMessage,
      message: "Message Saved Successfully!!!",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      data: {},
      message: "Cannot save the message!!!",
      error: error,
    });
  }
});

route.get("/:conversationId", (req, res) => {
  try {
    message.find(
      {
        conversationId: req.params.conversationId,
      },
      (error, messages) => {
        if (error) {
          return res.status(500).json({
            status: "Error",
            data: {},
            message: "cannot find messages!!!",
            error: error,
          });
        } else {
          return res.status(200).json({
            status: "Success",
            data: messages,
            message: "Successfully found messages!!!",
            error: null,
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      data: {},
      message: "cannot find messages!!!",
      error: error,
    });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    await message.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "Success",
      data: {},
      message: "message deleted successfully!!!",
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      data: {},
      message: "cannot delete message!!!",
      error: error,
    });
  }
});

module.exports = route;
