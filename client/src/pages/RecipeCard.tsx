interface Ingredient {
  ingredient: string;
  measurement: string;
}

interface RecipeCardProps {
  recipeImage: string;
  ingredients: Ingredient[];
  instructions: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipeImage, ingredients, instructions }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#fef3d0] shadow-lg rounded-lg mt-10 border border-gray-200">
      {/* Recipe Image */}
      {recipeImage && (
        <div className="mb-4">
          <img
            src={recipeImage}
            alt="Recipe"
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      )}

      {/* Recipe Title */}
      <h2 className="text-3xl font-bold text-[#a84e24] mb-4">Recipe Card</h2>

      {/* Ingredients List */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-[#a84e24] mb-2">Ingredients</h3>
        <ul className="list-disc list-inside space-y-1">
          {ingredients.map((item: Ingredient, index: number) => (
            <li key={index} className="text-gray-800">
              {item.ingredient} - {item.measurement}
            </li>
          ))}
        </ul>
      </div>

      {/* Cooking Instructions */}
      <div>
        <h3 className="text-2xl font-semibold text-[#a84e24] mb-2">Instructions</h3>
        <p className="text-gray-800 whitespace-pre-line">{instructions}</p>
      </div>
    </div>
  );
};

// Example usage with mock data (Replace with actual data from the form)
const App: React.FC = () => {
  const mockRecipe: RecipeCardProps = {
    recipeImage: 'https://via.placeholder.com/400', // Replace this with the actual image URL
    ingredients: [
      { ingredient: 'Flour', measurement: '2 cups' },
      { ingredient: 'Sugar', measurement: '1 cup' },
      { ingredient: 'Eggs', measurement: '2' },
    ],
    instructions: '1. Mix the flour and sugar.\n2. Add the eggs and mix well.\n3. Bake at 350°F for 25 minutes.',
  };

  return <RecipeCard {...mockRecipe} />;
};

export default App;