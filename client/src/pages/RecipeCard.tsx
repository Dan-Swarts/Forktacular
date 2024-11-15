import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#fef3d0] min-h-screen pt-24"> {/* Added pt-24 to prevent content from being hidden behind the navbar */}
  <nav className="bg-[#f5d3a4] shadow-md fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 max-w-7xl mx-auto z-10">
    {/* Forktacular button on the left */}
    <button
      onClick={() => navigate('/')}
      className="text-[#a84e24] hover:text-[#b7572e] font-semibold"
    >
      Forktacular
    </button>

    {/* Title centered */}
    <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">
      My Recipe
    </div>

    {/* Account button on the right */}
    <div className="flex">
      <button
        onClick={() => navigate('/user-info')}
        className="text-[#a84e24] hover:text-[#b7572e]"
      >
        Account
      </button>
    </div>
  </nav>

  <div className="max-w-2xl mx-auto p-6 bg-[#fadaae] shadow-lg rounded-lg mt-10 border border-gray-200">
    {/* Recipe Image */}
    {recipeImage && (
      <div className="mb-6">
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
      <ul className="list-disc list-inside space-y-2">
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