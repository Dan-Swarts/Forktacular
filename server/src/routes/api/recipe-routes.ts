import express from 'express';
import type { Request, Response } from 'express';
import { Recipe } from '../../models/index.js';

 const router = express.Router();

//  GET /api/recipes - Get all recipes
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

// GET /api/recipes/:id - Get recipe by ID
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

// POST /api/recipes - Create new recipe
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


// PUT /api/recipes/:id - Update recipe by ID
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

// DELETE /recipes/:id - Delete recipe by ID
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
