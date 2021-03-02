const app = require("./server/server.js");

const main = async () => {
  await app.register();
  await app.start();
};

main();
