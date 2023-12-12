const { API_STATUS_CODES } = require("../constants/constants");
module.exports = {
  CONTROLLER_ERROR: {
    status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: "Internal server error.",
  },
  INVALID_REQUEST: {
    status: API_STATUS_CODES.ERROR_CODE,
    message: "Invalid request.",
  },
  AUTHORIZATION_FAILED: {
    status: API_STATUS_CODES.AUTHORIZATION_FAILED,
    message: "Authorization failed.",
  },
};
