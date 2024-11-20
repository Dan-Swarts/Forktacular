import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/user.js';
import { Recipe } from '../../models/recipe.js'; 
import sequelize from '../../config/connection.js';


const router = express.Router();

// GET /api/users/userRecipes
router.get('/userRecipes', async (req: Request, res: Response) => {
  const userInfo = req.user;
  if(!userInfo){return res.sendStatus(404);}
  try {
    const user = await User.findByPk(userInfo.id, {
        include: [{ model: Recipe }], 
      },
    );

    if (user) {
      return res.json(user.Recipes); // Ensure we return the recipes, not the entire user

    } else {
      return res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Get /api/users/account
router.get('/account', async (req:Request,res:Response) => {
  try{
    const userInfo = req.user;

    if(!userInfo){
      return res.status(400).json({message: 'bad request'});
    }

    const user = await User.findByPk(userInfo.id);
    return res.status(200).json(user);
  } catch(error) {
    return res.status(500).json(error);
  }
});

// PUT /api/users/account/update
router.put('/account/update', async (req:Request,res:Response) => {
  try{
    const userInfo = req.user;

    if(!userInfo){
      return res.status(400).json({message: 'bad request'});
    }

    const user = await User.findByPk(userInfo.id);

    if(!user){
      return res.status(404).json({message: 'user not found'});
    }

    const { intolerance, diet, favIngredients, } = req.body;

    if(intolerance){ user.intolerance = intolerance; }
    if(diet){ user.diet = diet; }
    if(favIngredients){ user.favIngredients = favIngredients; }

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// POST api/users/recipes/:recipeId - Save a recipe to a user 
router.post('/save/recipe/:recipeId', async (req: Request, res: Response) => {
  const userInfo = req.user;
  const { recipeId } = req.params;
  if(!userInfo){return res.sendStatus(404);}

  try {
    // Find the User
    const user = await User.findByPk(userInfo.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      console.log(user);
    }

    // Find the Recipe
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    } else {
    console.log(recipe.title); 
    console.log(User.associations);
    console.log(Recipe.associations); 
    console.log('Connecting to database: ', sequelize.config.database); 
  
  }
    // Add the Recipe to the User
   await user.addRecipe(recipe); // Sequelize's `add` method handles the UserRecipe join table

    return res.status(200).json({
      message: `Recipe (ID: ${recipeId}) successfully saved for User (ID: ${userInfo.id}).`,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE api/users/:id - Delete a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if(user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// DELETE api/users/ - User deletes themselves
router.delete('/', async (req: Request, res: Response) => {
  try {
    const userInfo = req.user;
    if(!userInfo){return res.sendStatus(404);}
    const user = await User.findByPk(userInfo.id);

    if(user) {
      await user.destroy();
      return res.json({ message: 'User deleted' });
    } else {
      return res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
});

export { router as userRouter };
