const cors = require("cors");
const morgan = require("morgan");
const express = require("express")


module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(morgan("combined"));
};
