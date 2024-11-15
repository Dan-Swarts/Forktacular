import Recipe from "../types/recipe";
import apiService from "../api/apiService";
import { currentRecipeContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";


interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe: { spoonacularId, title, image }}: RecipeCardProps) {
  const { setCurrentRecipeDetails } = useContext(currentRecipeContext);

  const handleSubmit = async () => {
    const id = spoonacularId;
    const recipeDetails = await apiService.forignInformationSearch(id);
    setCurrentRecipeDetails(recipeDetails);
  }
  
  return (
        <div
          key={title}
          className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105"
        >
          {/* Recipe Image */}
          {image && (
            <img
              src={image}
              alt={`Recipe ${title}`}
              className="w-full h-56 object-cover"
            />
          )}

          <div className="p-6 bg-gradient-to-r from-amber-50 to-white">
            {/* Recipe Title */}
            <h2 className="text-2xl font-bold text-amber-800 mb-3">{title}</h2>

            {/* Ingredients */}
            <h3 className="text-lg font-semibold text-amber-700 mb-2">Nutrients:</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">

            </ul>

            {/* View Recipe Button */}
            <div className="mt-4 w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 rounded-md hover:from-teal-600 hover:to-teal-800 transition-colors"
            
            >
              <Link to="/recipe-showcase"
              onClick={handleSubmit}
            >
              PRESS ME
            </Link>
            </div>
      
          </div>
        </div>
  );
};

