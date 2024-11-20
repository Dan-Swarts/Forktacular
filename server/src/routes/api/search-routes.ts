import { Router, Request, Response } from "express";
import spoonacularService from '../../service/spoonacularService.js';
import searchInput from "../../types/searchInput.js";

const router = Router();

router.get('/test', (_req:Request, res:Response) => {
    try{
        res.status(200).json({ message: 'helloWorld' });
    } catch(error) {
        res.status(500).json({ message: 'hello' });
    }
});

router.post('/recipes', async (req: Request, res: Response) => {
    try {
        const searchTerms: searchInput = req.body;
        const recipes = await spoonacularService.findRecipes(searchTerms);
        res.status(200).json(recipes);
    } catch(error) {
        res.status(500).json(error);
    }
});

router.post('/information', async (req: Request, res: Response) => {
    try{
        const id: number = req.body.id;
        const information = await spoonacularService.findInformation(id);
        res.status(200).json(information);
    } catch(error) {
        res.status(500).json(error);
    }
});

export default router;