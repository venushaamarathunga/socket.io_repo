import jwt from "jsonwebtoken";

const genarateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
    algorithm: "RS256",
    expiresIn: 60 * 60,
  });
};

const validateToken = (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY || "Authorization";
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const token = req.header(tokenHeaderKey);

  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    // Ensure the token follows "Bearer <TOKEN>" format
    const tokenValue = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const verified = jwt.verify(tokenValue, jwtSecretKey);
    req.user = verified; // Attach user data to req object

    return res.send("Successfully Verified");
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token", error });
  }
};

export { genarateToken, validateToken };
