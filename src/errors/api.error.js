class ApiError extends Error {
  constructor({
    status, message, errorCode, data = {}, errorType,
  }) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
    this.data = data;
    this.errorType = errorType;
  }

  toObject() {
    return {
      status: this.status,
      message: this.message,
      errorCode: this.errorCode,
      data: this.data,
      errorType: this.errorType,
    };
  }
}

module.exports = ApiError;
