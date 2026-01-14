import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Bearer token (production)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2️⃣ Fallback to HttpOnly cookie (local/dev)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
