import { Outlet, Link } from 'react-router-dom';
import './index.css';
import { createContext, useState } from 'react';
import RecipeDetails from './types/recipeDetails';

const defaultRecipe: RecipeDetails  = {
  title: '',
  summary: '',
  readInMinutes: 0,
  servings: 0,
  ingredients: [],
  instructions: '',
  steps: [],
  diets: [],
  image: '',
  sourceUrl: '',
  spoonacularSourceUrl: '',
  spoonacularId: 0,
};


export const currentRecipeContext = createContext({
  currentRecipeDetails: defaultRecipe,
  setCurrentRecipeDetails: (recipe: RecipeDetails) => {console.log(recipe)},
});

export function App() {
  const [currentRecipeDetails,setCurrentRecipeDetails] = useState<RecipeDetails>(defaultRecipe);
  
  return (
    <currentRecipeContext.Provider value ={{ currentRecipeDetails, setCurrentRecipeDetails}}>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/recipe-book">Recipe Book</Link></li>
            <li><Link to="/recipe-maker">Recipe Maker</Link></li>
            <li><Link to="/user-info">User Info</Link></li>
          </ul>
        </nav>
        {/* This Outlet is essential for nested routes to be displayed */}
        <Outlet />
      </div>
    </currentRecipeContext.Provider>
  );
};