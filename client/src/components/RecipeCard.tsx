import Recipe from "../interfaces/recipe";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import apiService from "../api/apiService";
import { currentRecipeContext } from "../App";


interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe: { spoonacularId, title, image }}: RecipeCardProps) {
  const { setCurrentRecipeDetails } = useContext(currentRecipeContext);
  const handleSubmit = async () => {
    const id = spoonacularId;
    const recipeDetails = await apiService.forignInformationSearch(id);
    setCurrentRecipeDetails(recipeDetails);
    navigate('/recipe-showcase')
  }

    const navigate = useNavigate();
    
    return (
        <div
          className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105"
        >
          {/* Recipe Image */}
          {image && (
            <img
              src={image}
              alt={`Recipe`}
              className="w-full h-56 object-cover"
            />
          )}

          <div className="p-6 bg-gradient-to-r from-[#f5d3a4] to-white">
            {/* Recipe Title */}
            <h2 className="text-2xl font-bold text-[#a84e24] mb-3">{title}</h2>

            {/* Ingredients
            <h3 className="text-lg font-semibold text-[#a84e24] mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
            </ul> */}

            {/* View Recipe Button */}
            <button
              onClick={handleSubmit}
              className="mt-4 w-full bg-[#ff9e40] text-white py-2 rounded-lg shadow hover:bg-[#e7890c] transition-colors duration-200"
            >
              View Recipe
            </button>
          </div>
        </div>
      )
}