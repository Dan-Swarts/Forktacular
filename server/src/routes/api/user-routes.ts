import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/user.js';
import { Recipe } from '../../models/recipe.js'; 


const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET /users/:id - Get a user by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if(user) {
      res.json(user);
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

// GET /users/:id/recipes - Get all recipes saved by a User
router.get('/:id/recipes', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Recipe,
        through: { attributes: [] }, // Exclude join table attributes
      },
    });

    if (user) {
      return res.json(user.recipes); // Ensure we return the recipes, not the entire user
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

// POST /users - Create a new user
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

// POST /users/:userId/recipes/:recipeId - Save a recipe to a user
router.post('/:userId/recipes/:recipeId', async (req: Request, res: Response) => {
  const { userId, recipeId } = req.params;
  try {
    // Find the User
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the Recipe
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    console.log(User.associations);
    console.log(Recipe.associations);

    // Add the Recipe to the User
    await user.addRecipe(recipe); // Sequelize's `add` method handles the UserRecipe join table

    return res.status(200).json({
      message: `Recipe (ID: ${recipeId}) successfully saved for User (ID: ${userId}).`,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// PUT /users/:id - Update a user by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userName, userEmail, userPassword, intolerance, diet, favIngredients } = req.body;
  try {
    const user = await User.findByPk(id);
    if(user) {
      user.userName = userName;
      user.userEmail = userEmail; 
      user.userPassword = userPassword; 
      user.intolerance = intolerance; 
      user.diet = diet; 
      user.favIngredients = favIngredients; 

      await user.save();
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE /users/:id - Delete a user by ID
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

export { router as userRouter };
