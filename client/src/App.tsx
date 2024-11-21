import { Outlet} from 'react-router-dom';
import './index.css';
import RecipeDetails from './interfaces/recipeDetails';
import { createContext, useState } from 'react';

const defaultRecipe: RecipeDetails  = {
  id: 0, 
  title: '',
  summary: '',
  readyInMinutes: 0,
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

function App() {
  const [currentRecipeDetails,setCurrentRecipeDetails] = useState<RecipeDetails>(defaultRecipe);
  return (
    <currentRecipeContext.Provider value ={{ currentRecipeDetails, setCurrentRecipeDetails}}>
    <div>
      <Outlet />
    </div>
    </currentRecipeContext.Provider>
  );
}

export default App;