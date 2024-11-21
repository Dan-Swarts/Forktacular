import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { currentRecipeContext } from "../App";
import RecipeDetails from "../interfaces/recipeDetails";

const RecipeMaker = () => {
  const navigate = useNavigate();
  const { setCurrentRecipeDetails } = useContext(currentRecipeContext);
  const [recipe, setRecipe] = useState<RecipeDetails>({
    title: "",
    summary: "",
    readyInMinutes: 0,
    servings: 0,
    ingredients: [""],
    instructions: "",
    steps: [],
    diets: [],
    image: "",
  });

  const handleChange = (field: keyof RecipeDetails, value: any) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleListChange = (field: keyof RecipeDetails, index: number, value: string) => {
    const updatedList = [...(recipe[field] as string[])];
    updatedList[index] = value;
    setRecipe((prev) => ({
      ...prev,
      [field]: updatedList,
    }));
  };

  const handleAddItem = (field: keyof RecipeDetails) => {
    setRecipe((prev) => ({
      ...prev,
      [field]: [...(recipe[field] as string[]), ""],
    }));
  };

  const handleRemoveItem = (field: keyof RecipeDetails, index: number) => {
    const updatedList = [...(recipe[field] as string[])];
    updatedList.splice(index, 1);
    setRecipe((prev) => ({
      ...prev,
      [field]: updatedList,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRecipeDetails(recipe);
    navigate("/recipe-showcase");
  };

  return (
    <div className="bg-[#fef3d0] min-h-screen pt-24 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Create a Recipe</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#fadaae] p-6 shadow-lg rounded-lg space-y-4 border border-gray-200"
      >
        <div>
          <label className="block font-bold mb-1">Title</label>
          <input
            type="text"
            value={recipe.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Summary</label>
          <textarea
            value={recipe.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Ready In Minutes</label>
          <input
            type="number"
            value={recipe.readyInMinutes}
            onChange={(e) => handleChange("readyInMinutes", +e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Servings</label>
          <input
            type="number"
            value={recipe.servings}
            onChange={(e) => handleChange("servings", +e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleListChange("ingredients", index, e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("ingredients", index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("ingredients")}
            className="text-blue-500"
          >
            Add Ingredient
          </button>
        </div>

        <div>
          <label className="block font-bold mb-1">Instructions</label>
          <textarea
            value={recipe.instructions}
            onChange={(e) => handleChange("instructions", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Diets Section */}
        <div>
          <label className="block font-bold mb-1">Diets</label>
          {(recipe.diets ?? []).map((diet, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={diet}
                onChange={(e) => handleListChange("diets", index, e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("diets", index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("diets")}
            className="text-blue-500"
          >
            Add Diet
          </button>
        </div>

        {/* Steps Section */}
        <div>
          <label className="block font-bold mb-1">Steps</label>
          {(recipe.steps ?? []).map((step, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={step}
                onChange={(e) => handleListChange("steps", index, e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("steps", index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("steps")}
            className="text-blue-500"
          >
            Add Step
          </button>
        </div>

        <div>
          <label className="block font-bold mb-1">Image URL</label>
          <input
            type="text"
            value={recipe.image ?? ""} // Handle null value
            onChange={(e) => setRecipe({ ...recipe, image: e.target.value })}
            className="p-2 border rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#a84e24] text-white font-bold p-2 rounded"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeMaker;
