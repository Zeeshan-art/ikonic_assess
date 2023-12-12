module.exports = {
  API_STATUS_CODES: {
    SUCCESS: 200,
    NOT_FOUND: 404,
    AUTHORIZATION_FAILED: 401,
    ERROR_CODE: 400,
    INTERNAL_SERVER_ERROR: 500,
    DUPLICATE_ENTRY: 11000,
  },
  RESPONSE_MESSAGES: {
    SUCCESS: "Success",
    AUTHORIZATION_FAILED: "Authorization failed",
    DUPLICATE_ENTRY: "email already exist.",
    POST_ADDED: "post added successfully",
    NOT_FOUND: "not found",
  },

  ROLES: {
    ADMIN: "admin",
    USER: "user",
  },
};
