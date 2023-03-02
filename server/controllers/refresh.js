import jwt from "jsonwebtoken";
import { generateAccessToken } from "./auth.js";

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401); // No Content

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_JWT_KEY, (err, decoded) => {
    if (err)
      // this refresh prop to make me know that the err 403 comes from refresh not from middleware
      // to make logout when it expired
      return res.status(403).json({ msg: "Token is not valid", refresh: true });
    const newAccessToken = generateAccessToken(decoded.id);
    res.json({ accessToken: newAccessToken });
  });
};
