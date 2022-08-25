class ApiError extends Error {
  constructor({
    status, message, errorCode, data = {},
  }) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
    this.data = data;
  }

  toObject() {
    return {
      status: this.status,
      message: this.message,
      errorCode: this.errorCode,
      data: this.data,
    };
  }
}

module.exports = ApiError;
