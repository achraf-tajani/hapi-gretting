const Boom = require("@hapi/boom");

const handleSuccess = (request, h, data, responseMessage) => {
  request.log("debug", "Request success returned data " + JSON.stringify(data));
  if (!responseMessage) {
    responseMessage = "Request proceed success";
  }
  return h.response({
    statusCode: 200,
    statusMessage: responseMessage,
    data: data,
    dateResponse: new Date(),
  });
};

const handleError = (request, h, error) => {
  if (error.response) {
    return h.response({
      statusCode: error.response.status,
      statusMessage: error.response.data.message,
    });
  }
  return h.response({
    statusCode: 500,
    statusMessage: error.message,
  });
};

module.exports = {
  handleSuccess,
  handleError,
};
