const jwt = require('jsonwebtoken');
const ApiError = require('../errors/api.error');

const config = process.env;

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    // eslint-disable-next-line no-param-reassign
    socket.user = decoded;
  } catch (error) {
    return next(new ApiError({ message: 'NOT_AUCHORIZED', status: 422 }));
  }
  return next();
};

module.exports = verifyTokenSocket;
