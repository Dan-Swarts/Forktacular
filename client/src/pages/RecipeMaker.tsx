import { ChangeEvent, useState } from 'react';

const RecipeMaker = () => {
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<{ ingredient: string; measurement: string }[]>([{ ingredient: '', measurement: '' }]);
  const [instructions, setInstructions] = useState<string>('');

  // Handle file upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRecipeImage(URL.createObjectURL(file));
    }
  };

  // Handle ingredient change
  const handleIngredientChange = (index: number, field: 'ingredient' | 'measurement', value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  // Add new ingredient field
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: '', measurement: '' }]);
  };

  // Remove ingredient field
  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // Handle instruction change
  const handleInstructionsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInstructions(e.target.value);
  };

  // Handle form submission 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form data
    console.log('Recipe Submitted:', { recipeImage, ingredients, instructions });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Recipe Maker</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipe Image Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium mb-2">Recipe Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 hover:file:bg-gray-200"
          />
          {recipeImage && (
            <div className="mt-4">
              <img src={recipeImage} alt="Recipe Preview" className="w-full h-48 object-cover rounded-md" />
            </div>
          )}
        </div>

        {/* Ingredients Section */}
        <div>
          <label className="block text-lg font-medium mb-2">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                value={ingredient.ingredient}
                onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                placeholder="Ingredient"
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={ingredient.measurement}
                onChange={(e) => handleIngredientChange(index, 'measurement', e.target.value)}
                placeholder="Measurement"
                className="w-1/3 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="text-blue-600 hover:text-blue-800"
          >
            Add Ingredient
          </button>
        </div>

        {/* Cooking Instructions Section */}
        <div>
          <label htmlFor="instructions" className="block text-lg font-medium mb-2">Cooking Instructions</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={handleInstructionsChange}
            placeholder="Write your cooking instructions here..."
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeMaker;
