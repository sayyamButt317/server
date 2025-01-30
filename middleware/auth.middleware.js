import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  
    let token = req.cookies.accessToken;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token not found,authorization denied",
      });
    }
    try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};
export default verifyToken;
