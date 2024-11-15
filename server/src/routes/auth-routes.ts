import { Router, Request, Response, } from "express";

const router = Router();

router.get('/test',(_req:Request,res:Response) => {
    try{
        res.status(200).json({ message: 'right' })
    } catch(error){
        res.status(400).json({ message: 'wrong' })
    }
});

export default router;