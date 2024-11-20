import { Router, Request, Response, } from "express";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/login', async (req:Request,res:Response) => {
    try{
        const { userEmail, userPassword, } = req.body;

        const user = await User.findOne({
            where: { userEmail },
        });

        if(!user){
            return res.status(401).json({ message: 'Authentication failed.'});
        }

        const passwordIsValid = await bcrypt.compare(userPassword, user.userPassword);
        if(!passwordIsValid){
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        const secretKey = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign(
            { id: user.id, userEmail: user.userEmail, userName: user.userName }, 
            secretKey, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });

    } catch(error){
        return res.sendStatus(500);
    }
});


router.post('/signUp', async (req:Request,res:Response) => {
    try{
        const { userName, userEmail, userPassword, } = req.body;
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const user = await User.create({ userName, userEmail, userPassword: hashedPassword });
        
        const secretKey = process.env.JWT_SECRET_KEY || '';

        const token = jwt.sign(
            { id: user.id, userEmail: user.userEmail, userName: user.userName }, 
            secretKey, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });

    } catch(error:any){
        return res.status(500).json(error.message);
    }
});

export default router;