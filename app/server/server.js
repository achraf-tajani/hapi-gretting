"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes.js");
const plugins = require("./plugins.js");
const config = require("./config");

const server = Hapi.server({
  port: config.serverPort,
  host: config.serverHost,
  routes: {
    cors: {
      origin: ["*"],
    },
  },
});

const messagesServer = Hapi.server({
  port: 4000,
  host: config.serverHost,
});

server.route(routes);

const app = {
  register: async () => {
    await server.register(plugins);
  },
  init: async () => {
    await server.initialize();
    return server;
  },
  start: async () => {
    console.log(
      "info",
      "Starting serveur on port " +
        process.env.SERVER_PORT +
        " and host " +
        process.env.SERVER_HOST +
        " for API context " +
        config.apiRootContext
    );
    await messagesServer.start();
    await server.start();
    console.log("info", "Server running at: " + server.info.uri);
    console.log("info", "server started with config " + JSON.stringify(config));

    return server;
  },
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

// listen on SIGINT signal and gracefully stop the server
process.on("SIGINT", function () {
  console.log("Stopping server: " + server.info.uri);

  server.stop({ timeout: 10000 }).then(function (err) {
    console.log("Server: " + server.info.uri + " stopped");
    process.exit(err ? 1 : 0);
  });
});

module.exports = app;
