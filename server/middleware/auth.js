// AUTHORIZATION
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    
    if (!token) { // token doesn't exist 
      return res.status(403).send("Access Denied");
    }
    // In frontend, we make the token start with Bearer
    if (token.startsWith("Bearer ")) { 
      token = token.slice(7, token.length).trimLeft();
    }
    
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified;

    // since this is a middleware, next will be used to run the next function
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
