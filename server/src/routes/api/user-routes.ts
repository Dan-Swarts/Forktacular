import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/user.js';
import { Recipe } from '../../models/recipe.js'; 
import sequelize from '../../config/connection.js';


const router = express.Router();


// GET /api/users/databaseUsers - Get all users
router.get('/databaseUsers', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Get all recipes saved by one logged-in user
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

// Get the account details of one logged-in user
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

// Update the account of one logged-in user
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


// Save a recipe to one logged-in user
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
      message: 'An error occurred while adding the recipe to the user.',
      error: error.message,
    });
  }
});

// Remove a recipe from one logged-in user 
// DELETE api/users/remove/recipe/:recipeId
router.delete('/remove/recipe/:recipeId', async (req: Request, res: Response) => {
  const userInfo = req.user; 
  const { recipeId } = req.params;

  if (!userInfo) {
    return res.sendStatus(404); 
  }

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
    // Remove the Recipe from the User
    await user.removeRecipe(recipe); // Sequelize's `remove` method handles the join table deletion

    return res.status(200).json({
      message: `Recipe (ID: ${recipeId}) successfully removed from User (ID: ${userInfo.id}).`,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while removing the recipe from the user.',
      error: error.message,
    });
  }
});



// Delete the user by their account ID (not logged-in)
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

// Delete the account of a logged-in user
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
