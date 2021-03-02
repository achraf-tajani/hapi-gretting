module.exports = {
  /** server */
  serverPort: process.env.SERVER_PORT,
  serverHost: process.env.SERVER_HOST,
  apiRootContext: "/api/v1",

  /** plugin */
  startPluginStatusMonitor: process.env.PLUGIN_STATUS_MONITOR,
  /** logger */
  logLevel: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "ERROR",
  logFormat: process.env.LOG_FORMAT ? process.env.LOG_FORMAT : "JSON",
  prettyPrint: process.env.LOG_PRETTY_PRINT
    ? process.env.LOG_PRETTY_PRINT
    : "false",
  printRequestHeaders: process.env.LOG_PRINT_REQUEST_HEADER
    ? process.env.LOG_PRINT_REQUEST_HEADER
    : "true",
  printResponseHeaders: process.env.LOG_PRINT_RESPONSE_HEADER
    ? process.env.LOG_PRINT_RESPONSE_HEADER
    : "true",
};
