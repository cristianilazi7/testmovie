import jwt from 'jsonwebtoken';
import {environment} from '../../environments/environment'
import { Request, Response, NextFunction } from "express";
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    
    jwt.verify(token, environment.secret, (err, user) => {
      //console.log(err.message);
      if (err) return res.status(403).json({'token:': err.message });
      req.body = user
      next() // pass the execution off to whatever request the client intended
    })
};
export default authenticateToken;