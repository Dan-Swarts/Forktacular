import express from 'express';
import type { Request, Response } from 'express';
import { Recipe } from '../../models/index.js';
import { User } from '../../models/index.js';


 const router = express.Router();

// 1.  GET /api/recipes - Get all recipes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// 2. GET /api/recipes/:id - Get recipe by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id);
    if(recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({
        message: 'Recipe not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});


// 3. GET /api/recipes/users/:userId - Get recipeIds by userIds
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      const userWithRecipes = await User.findOne({
          where: { id: userId }, 
          include: {
              model: Recipe,      
              through: { attributes: [] }, // Omit join table data from response
              attributes: ['id'],  // Fetch only RecipeIDs
          },
      });

      if (!userWithRecipes) {
          // If user not found, return a 404 response
          return res.status(404).json({ message: 'User not found' });
      }

      // Extract RecipeIDs
      const recipeIds = userWithRecipes.Recipes?.map(recipe => recipe.id);

      // Respond with the RecipeIDs
      return res.json({ recipeIds });
  } catch (error) {
      // Handle unexpected errors
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
  }
});



// 4. POST /api/recipes - Create new recipe
router.post('/', async (req: Request, res: Response) => {
  const { title, summary, readyInMinutes, servings, ingredients, instructions, steps, diets, image, sourceUrl, spoonacularId, spoonacularSourceUrl } = req.body;
  try {
    const newRecipe = await Recipe.create({
      title, summary,readyInMinutes, servings, ingredients, instructions, steps, diets, image, sourceUrl, spoonacularId, spoonacularSourceUrl
    });
    res.status(201).json(newRecipe);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});


// 5. PUT /api/recipes/:id - Update recipe by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, summary, readyInMinutes, servings, ingredients, instructions, steps, diets, image, sourceUrl, spoonacularId, spoonacularSourceUrl } = req.body;
  try {
    const recipe = await Recipe.findByPk(id);
    if(recipe) {
      recipe.title = title;
      recipe.summary = summary;
      recipe.readyInMinutes = readyInMinutes;
      recipe.servings = servings;
      recipe.ingredients = ingredients; 
      recipe.instructions = instructions; 
      recipe.steps = steps; 
      recipe.diets = diets;
      recipe.image = image; 
      recipe.sourceUrl = sourceUrl; 
      recipe.spoonacularId = spoonacularId; 
      recipe.spoonacularSourceUrl = spoonacularSourceUrl; 

      await recipe.save();
      res.json(recipe);
    } else {
      res.status(404).json({
        message: 'Recipe not found'
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// 6. DELETE /recipes/:id - Delete recipe by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id);
    if(recipe) {
      await recipe.destroy();
      res.json({ message: 'Recipe deleted' });
    } else {
      res.status(404).json({
        message: 'Recipe not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});




export { router as recipeRouter };
