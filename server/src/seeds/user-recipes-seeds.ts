import { UserRecipes } from '../models/index.js';

export const seedUserRecipes = async (): Promise<void> => {
  await UserRecipes.bulkCreate([
    { UserId: 1, RecipeId: 1 }, // Paul likes Rosemary and Red Onion Focaccia
    { UserId: 1, RecipeId: 3 }, // Paul also likes Kale Bruschetta
    { UserId: 2, RecipeId: 1 }, // Joe likes Rosemary and Red Onion Focaccia
    { UserId: 3, RecipeId: 2 }, // Jessica likes Italian Steamed Artichokes
    { UserId: 4, RecipeId: 1 }, // Jennifer likes Rosemary and Red Onion Focaccia
    { UserId: 4, RecipeId: 3 }, // Jennifer also likes Kale Bruschetta
  ], { individualHooks: true})
};