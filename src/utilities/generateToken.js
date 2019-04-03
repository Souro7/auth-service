const jwt = require("jsonwebtoken");

const privateKEY = require("../keys/privateKey");

//generate token using jsonwebtoken
function generateToken(payload) {
  var token = jwt.sign(payload, privateKEY, { algorithm: "RS256" });
  return token;
}

// console.log(generateToken({ data: "testData" }));

module.exports = generateToken;
