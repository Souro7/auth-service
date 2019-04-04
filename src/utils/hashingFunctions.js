const bcrypt = require("bcrypt");

async function encrypt(password) {
  const saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);

  return hash;
}

async function compare(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

// encrypt("testpassword").then(data => {
//   compare("testpassworD", data).then(data => {
//     console.log(data);
//   });
// });

module.exports = { encrypt, compare };
