import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/user.js';
import { Recipe } from '../../models/recipe.js'; 
import sequelize from '../../config/connection.js';


const router = express.Router();

// 1. GET /api/users - Get all users
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

// 2. GET api/users/:id - Get a user by ID

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

// 3. GET api/users/:id/recipes - Get all recipes saved by a User
router.get('/recipes', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
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

// 2. GET api/users/:id - Get a user by ID
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

// 3. GET api/users/:id/recipes - Get all recipes saved by a User
router.get('/:id/recipes', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
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


// 4. POST api/users - Create a new user
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

// 5. POST api/users/:userId/recipes/:recipeId - Save a recipe to a user 
router.post('/:userId/recipes/:recipeId', async (req: Request, res: Response) => {
  const { userId, recipeId } = req.params;
  try {
    // Find the User
    const user = await User.findByPk(userId);
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
      message: `Recipe (ID: ${recipeId}) successfully saved for User (ID: ${userId}).`,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

// 6. PUT api/users/:id - Update a user by ID
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

// 7. DELETE api/users/:id - Delete a user by ID
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
