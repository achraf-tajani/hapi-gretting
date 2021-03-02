const client = require("prom-client");
const counter = new client.Counter({
  name: "call_to_greetings",
  help: "call_to_greetings_help",
});

const greetings = (message) => {
  counter.inc();
  if (!message) {
    message = "";
  }
  let myGretings = {
    message: "Hello  : " + message,
  };
  return myGretings;
};
const greetingsRequest = (request) => {
  if (request.params.message == "error") {
    console.error(request, "coucou error sans stack");
  }
  console.log(request, "coucou info", "RG # 24");
  return greetings(request.params.message);
};
module.exports = {
  greetings,
  greetingsRequest,
};
