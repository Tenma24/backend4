const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized (no token)" });
  }

  try {
    const secret = process.env.JWT_SECRET || "dev_secret";
    const payload = jwt.verify(token, secret);
    req.user = payload; // { id, email, role }
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized (invalid token)" });
  }
}

module.exports = auth;
