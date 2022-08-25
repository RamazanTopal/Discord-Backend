// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.name === 'ApiError') {
    const {
      status, message, errorCode, data,
    } = err.toObject();

    console.info('API ERROR', message, status);

    res.status(err.status).json({
      status, message: message.replace('ApiError:', ''), errorCode, data,
    });
  } else if (err.name === 'ValidationError') {
    console.info('VALIDATION ERROR', err);

    res.status(err.status).json(err);
  } else {
    console.info('ERROR', {
      status: err.status,
      message: err.message || 'Interval Server Error',
      errorCode: err.errorCode || 500,
    });
    res.status(err.status || 500).json({
      status: err.status,
      message: err.message || 'Interval Server Error',
      errorCode: err.errorCode,
    });
  }
};
