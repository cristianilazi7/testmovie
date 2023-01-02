import express from 'express';
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import {environment} from '../../environments/environment';

const AuthRoutes = express.Router();

// genetarion token
AuthRoutes.route('/').post([
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 })
],(req: Request , res: Response)=> {
      // Finds the validation errors in this request and wraps them in an object with handy functions
     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        console.log('entro al auth',req.body.email);
        const email = req.body.email;
        const password = req.body.password;
         console.log('email', email);
         console.log('password', password);
        const token = jwt.sign({
            data: email
          }, environment.secret);
          console.log('token', token);
         res.status(200).json({'email':email, 'password':password,'Token':token, 'result': 'successfully','status':200});

});

export default AuthRoutes;
