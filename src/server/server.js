const express = require("express");
const bodyParser = require("body-parser");

const authRoute = require("./routes/authRoute");

const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoute);

app.listen(3001, function() {
  console.log("listening on port 3001!");
});
