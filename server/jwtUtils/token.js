import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// import dotenv from "dotenv";

// dotenv.config();

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: 60 * 60,
  });
};

const validateToken = async (req, res, next) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY || "Authorization";
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const token = req.header(tokenHeaderKey);

  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    // Ensure the token follows "Bearer <TOKEN>" format
    const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const decoded = jwt.verify(tokenValue, jwtSecretKey);

    const user = await User.findById(decoded.payload.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token", error });
  }
};

export { generateToken, verify };
