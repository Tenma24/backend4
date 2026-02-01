function errorLogger(err, req, res, next) {
  console.error("ERROR:", err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Server error" });
}

module.exports = errorLogger;
