export const errorHandler = (err, req, res, next) => {
  console.error('[Atelier Error]', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An internal atelier server error occurred.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
