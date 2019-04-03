const cp = require("child_process");

function execute(command) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (err, stdout) => {
      if (err) return reject(err);
      return resolve(stdout);
    });
  });
}

async function run() {
  try {
    await execute("sequelize init");
    await execute("sequelize model:create --name user --attributes 'email:string password:string'");
    await execute("sequelize db:migrate");
  } catch (error) {
    console.log(error);
  }
}

//run below command to complete setup
// run().then(() => {
//   console.log("setup done");
// });
