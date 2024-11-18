import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';



export const authenticateToken = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.sendStatus(401);
        return;
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token,secretKey,(err,user) => {
        if(err) {
            return res.sendStatus(403);
        }

        req.user = user as {username: string}
        return next();
    });
}