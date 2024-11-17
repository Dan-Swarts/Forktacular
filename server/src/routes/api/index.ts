import { Router } from 'express';
//import { volunteerRouter } from './volunteer-routes.js';
//import { workRouter } from './work-volunteer.js';
import searchRouter from './search-routes.js';

const router = Router();

//router.use('/volunteers', volunteerRouter);
//router.use('/works', workRouter);
router.use('/search', searchRouter);

export default router;
