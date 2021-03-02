const Joi = require("@hapi/joi");

const httpResponse = Joi.object({
  statusCode: Joi.number(),
  statusMessage: Joi.string().max(300),
  data: Joi.object(),
  dateResponse: Joi.date(),
}).label("MKA HTTP Response message");

module.exports = {
  httpResponse,
};
