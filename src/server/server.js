const express = require("express");
const bodyParser = require("body-parser");

const authRoute = require("./routes/authRoute");
const logger = require("./winstonLogger");

const app = express();

process.on("uncaughtException", err => {
  logger.log({
    level: "error",
    message: err
  });
  process.exit();
});

process.on("unhandledRejection", err => {
  logger.log({
    level: "error",
    message: err
  });
  process.exit();
});

app.use(bodyParser.json());
app.use("/auth", authRoute);

//error handling middleware
app.use(function(err, req, res, next) {
  logger.log({
    level: "error",
    message: err
  });
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.code || 500).send("Error: " + err.message);
});

app.listen(3001, function() {
  console.log("listening on port 3001!");
});
