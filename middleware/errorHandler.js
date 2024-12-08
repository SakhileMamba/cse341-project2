const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error(err.stack);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    stack: err.stack
  });
};

module.exports = {
  errorHandler
};
