const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const hapiBoomDecorators = require("hapi-boom-decorators");
const hapijsStatusMonitor = require("hapijs-status-monitor");
const hapijsResponseTime = require("hapi-response-time");

//const pagination = require('hapi-pagination')
//const pino = require('hapi-pino')
const pkg = require("../../package.json");

const swaggerOptions = {
  info: {
    title: pkg.name,
    description: "API MKA Keolis",
    version: pkg.version,
    license: {
      name: pkg.license,
    },
  },
  grouping: "tags",
  documentationPath: "/api-doc",
};

const plugins = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  hapiBoomDecorators,
  hapijsResponseTime,
];

if (process.env.PLUGIN_STATUS_MONITOR !== "false") {
  plugins.push(hapijsStatusMonitor);
}

module.exports = plugins;
