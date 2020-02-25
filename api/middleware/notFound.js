function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      message: 'Invalid request address',
    },
  });
}

module.exports = notFoundHandler;
