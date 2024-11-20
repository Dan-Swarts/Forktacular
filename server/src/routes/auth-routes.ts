import { Router, Request, Response, } from "express";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

//route: auth/login
router.post('/login', async (req:Request,res:Response) => {
    try{
        const { userEmail, userPassword, } = req.body;

        const user = await User.findOne({
            where: { userEmail },
         
        });

        console.log(userEmail);
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


//route: auth/signUp
router.post('/signUp', async (req:Request,res:Response) => {
    try{
        console.log(req.body); 
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


// POST api/users - Create a new user
router.post('/', async (req: Request, res: Response) => {
    const { userName, userEmail, userPassword, intolerance, diet, favIngredients } = req.body;
    try {
      const newUser = await User.create({
        userEmail, userName, userPassword, intolerance, diet, favIngredients
      });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  });

export default router;