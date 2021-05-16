const errorHandler = (err, req, res, next) => {
  const error = { ...err };

  if (error.name === "SequelizeValidationError") {
    error.message = error.errors.map((error) => error.message);
    error.code = 422;
  }

  return res.status(error.code || 500).json({
    message: error.message || "Something went wrong. Try again later",
  });
};

export default errorHandler;
