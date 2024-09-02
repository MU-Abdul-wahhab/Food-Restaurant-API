import { validationResult } from "express-validator";
import { Jwt } from "../utils/Jwt";

export class GlobalMiddleware {
  static checkError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
      
    } else {
      next();
    }
  }

  static async auth(req, res, next) {
    const header_auth = req.headers.authorization;
    
    const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
    try {
      if (!token) {
        next(new Error("User Doesn't Exist"));
        req.errorStatus = 401;
      }
      const decoded = await Jwt.jwtVerify(token);
    
      req.user = decoded;
      next();
    } catch (e) {
        req.errorStatus = 401;
      next(new Error("User Doesn't Exist"));
    }
  }

  static  adminRole(req, res, next) {
   const user = req.user;
   if(user.type !== 'admin'){
    // req.errorStatus = 401;
    next(new Error('Your an Unauthorized user'));
  }
   
    next();
  }
}
