const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const privateKEY = fs.readFileSync(path.resolve(__dirname, "../keys/jwtRS256.key"));

//generate token using jsonwebtoken
function generateToken(payload) {
  var token = jwt.sign(payload, privateKEY, { algorithm: "RS256" });
  return token;
}

console.log(generateToken({ data: "testData" }));

module.exports = generateToken;
