require("dotenv").config();
require("./connection/db");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");
const auth = require("./routes/auth");
const conversation = require("./routes/conversation");
const message = require("./routes/message");
const user = require("./routes/user");
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.use("/api/auth", auth);
app.use("/api/conversation", conversation);
app.use("/api/message", message);
app.use("/api/user", user);
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log("Running at port :", port);
});
