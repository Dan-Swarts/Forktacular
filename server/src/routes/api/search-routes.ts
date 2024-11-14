import { Router, Request, Response } from "express";
import spoonacularService from '../../service/spoonacularService.js';

const router = Router();

router.get('/test', (_req:Request, res:Response) => {
    try{
        res.status(200).json({ message: 'helloWorld' });
    } catch(error) {
        res.status(500).json({ message: 'hello' });
    }
});

router.post('/search', async (_req:Request, res:Response) => {
    try{
        const message = 'hello';
        // const message = await spoonacularService.findRecipes({});
        console.log(spoonacularService);
        res.status(200).json({ message: message });
    } catch(error) {
        res.status(500).json({ message: 'hello' });
    }
});

export default router;