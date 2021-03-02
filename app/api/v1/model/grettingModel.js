const Joi = require("@hapi/joi");
const BaseSchema = require("./baseHttpModel");
const greetings = Joi.object({
  message: Joi.string().max(255).required(),
}).label("Greetings object");

const greetingsHttpResponse = BaseSchema.httpResponse
  .keys({
    data: greetings,
  })
  .label("Greetings http respose");

const simpleObject = BaseSchema.httpResponse
  .keys({
    data: {
      message: Joi.string().max(255).required(),
    },
  })
  .label("simple object");

module.exports = {
  greetings,
  greetingsHttpResponse,
  simpleObject,
};
