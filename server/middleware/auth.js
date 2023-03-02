import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "You are not authenticated!" });
  }

  if (!authHeader.startsWith("Bearer "))
    return res.status(401).json({ msg: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    if (err) return res.status(403).json({ msg: "Token is not valid!" });
    req.user = data.id;
    next();
  });
};
