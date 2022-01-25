const route = require("express").Router();
const conversation = require("../models/conversation");
route.post("/newConversation", async (req, res) => {
  console.log(req.body);
  try {
    const newConversation = await new conversation(req.body);
    await newConversation.save();
    res.status(200).json({
      status: "Success",
      data: newConversation,
      message: "New Conversation Started Successfully!!!",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      data: {},
      message: "Cannot Start new Conversation!!!",
      error: error,
    });
  }
});

route.get("/:id", (req, res) => {
  try {
    conversation.find(
      {
        members: { $in: [req.params.id] },
      },
      (error, conversation) => {
        if (error) {
          return res.status(500).json({
            status: "Error",
            data: {},
            message: "cannot find conversations!!!",
            error: error,
          });
        } else {
          return res.status(200).json({
            status: "Success",
            data: conversation,
            message: "Successfully found conversations!!!",
            error: null,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    await conversation.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "Success",
      data: {},
      message: "conversation deleted successfully!!!",
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      data: {},
      message: "cannot delete conversation!!!",
      error: error,
    });
  }
});

module.exports = route;
