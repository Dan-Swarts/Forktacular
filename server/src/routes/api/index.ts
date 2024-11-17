import { Router } from 'express';
import { recipeRouter } from './recipe-routes'; 
import { userRouter } from './user-routes'; 
import searchRouter from './search-routes.js';


const router = Router();

router.use('/recipes', recipeRouter); 
router.use('/search', searchRouter);
router.use('/users', userRouter); 

export default router;
