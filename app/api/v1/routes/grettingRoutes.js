const greetingsBusiness = require("../business/grettingBusiness.js");
const greetingsModel = require("../model/grettingModel.js");
const Boom = require("boom");
const queryHelper = require("../../helpers/queryHelper.js");

const { apiRootContext } = require("../../../server/config");

const axios = require("axios");

const routes = [
  {
    method: "GET",
    path: apiRootContext + "/greetings/{message}",
    options: {
      description: "Greetings service",
      notes:
        "Returns an object of type greetings with response, status and message",
      tags: ["api"],
      response: {
        schema: greetingsModel.greetingsHttpResponse,
      },
      validate: {
        params: greetingsModel.greetings,
      },
    },
    handler: (request, h) => {
      console.log(
        request,
        "Request 1 for greetings  [" + request.params.message + "] !"
      );
      if (request.params.message == "404") {
        throw Boom.notFound();
      } else if (request.params.message == "400") {
        throw Boom.badRequest();
      } else if (request.params.message == "412") {
        throw Boom.preconditionFailed();
      }
      return queryHelper.handleSuccess(
        request,
        h,
        greetingsBusiness.greetingsRequest(request)
      );
    },
  },
  {
    method: "GET",
    path: apiRootContext + "/example",
    options: {
      description: "Greetings service with 404 error",
      notes: "Returns an error object",
      tags: ["api"],
      response: {
        schema: greetingsModel.simpleObject,
      },
    },
    handler: (request, h) => {
      return queryHelper.handleSuccess(
        request,
        h,
        greetingsBusiness.greetings(JSON.stringify(request.query))
      );
    },
  },
  {
    method: "GET",
    path: apiRootContext + "/",
    options: {
      description: "TEST",
      notes: "Returns an greetings object",
      tags: ["api"],
      response: {
        schema: greetingsModel.simpleObject,
      },
    },
    handler: (request, h) => {
      return axios
        .get(msTestUrl + "/api/v1/greetings")
        .then(function (response) {
          return queryHelper.handleSuccess(
            request,
            h,
            greetingsBusiness.greetings(response.data[0].message)
          );
        })
        .catch(function (error) {
          console.error(request, error);
          throw Boom.badRequest;
        });
    },
  },
];
module.exports = routes;
