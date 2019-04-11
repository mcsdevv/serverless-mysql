const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.post("*", (req, res) => {
  res.status(200).send(req.body);
});

app.get("*", (req, res) => {
  res.send(200, "HELLO");
});

module.exports = app;
