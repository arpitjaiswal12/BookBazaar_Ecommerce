import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // requesting token fron the cookies 

  if (!token) return next(errorHandler(401, 'Unauthorized')); // user is not authorized 

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden !! Invalid token ')); // token is expire 

    req.user = user; 
    next();// sending user to next functionality 
  });
};
