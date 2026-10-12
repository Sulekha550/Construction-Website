
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please provide an authorization token.",
      });
    } 

    const token = authHeader.split(" ")[1];
      
    if (!token) {
      return res.status(401).json({  
        success: false,
        message: "Authorization token is missing.",
      }); 
    }         
      
    if (!process.env.JWT_SECRET) { 
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured.",
      });
    }   

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id || decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    req.admin = {
      id: decoded.id,
      role: decoded.role,
    };
           
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) { 
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authorization token.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

export default auth;  