import '../index.css';
import { useNavigate } from 'react-router-dom';

interface Ingredient {
  measurement: string;
  ingredient: string;
}

interface Recipe {
  title: string;
  recipeImage: string | undefined;
  ingredients: Ingredient[];
  instructions: string;
}

interface RecipeBookProps {
  recipes: Recipe[];
}

const RecipeBook = ({ recipes }: RecipeBookProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fef3d0]">
    {/* Navbar */}
    <nav className="bg-[#f5d3a4] shadow-md fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-2 max-w-7xl mx-auto z-10">
  {/* Forktacular button on the left */}
  <button
    onClick={() => navigate('/')}
    className="text-[#a84e24] hover:text-[#b7572e] font-semibold"
  >
    Forktacular
  </button>

  {/* Title centered */}
  <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">
    Recipe Search
  </div>

  {/* Navigation buttons on the right */}
  <div className="flex space-x-4">
    <button onClick={() => navigate('/search')} className="text-[#a84e24] hover:text-[#b7572e]">Search Page</button>
    <button onClick={() => navigate('/recipe-maker')} className="text-[#a84e24] hover:text-[#b7572e]">Recipe Maker</button>
    <button onClick={() => navigate('/user-info')} className="text-[#a84e24] hover:text-[#b7572e]">Account</button>
  </div>
</nav>

    {/* Content */}
    <div className="pt-20 px-4"> {/* Added padding-top to avoid overlap with fixed navbar */}
      <h1 className="text-4xl font-bold text-[#a84e24] mb-8 text-center">My Recipe Book</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted gap */}
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            {/* Recipe Image */}
            {recipe.recipeImage && (
              <img
                src={recipe.recipeImage}
                alt={`Recipe ${index}`}
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-6 bg-gradient-to-r from-[#f5d3a4] to-white">
              {/* Recipe Title */}
              <h2 className="text-2xl font-bold text-[#a84e24] mb-3">{recipe.title}</h2>

              {/* Ingredients */}
              <h3 className="text-lg font-semibold text-[#a84e24] mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside mb-4 space-y-1">
                {recipe.ingredients.map((item, idx) => (
                  <li key={idx} className="text-gray-800">
                    {item.measurement} {item.ingredient}
                  </li>
                ))}
              </ul>

              {/* View Recipe Button */}
              <button
                onClick={() => navigate('/recipe-card')}
                className="mt-4 w-full bg-[#ff9e40] text-white py-2 rounded-lg shadow hover:bg-[#e7890c] transition-colors duration-200"
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

// Example usage with mock data (Replace with actual recipe data from storage or state)
const App = () => {
  const mockRecipes: Recipe[] = [
    {
      title: 'Chocolate Cake',
      recipeImage: 'https://via.placeholder.com/400',
      ingredients: [
        { ingredient: 'Flour', measurement: '2 cups' },
        { ingredient: 'Cocoa Powder', measurement: '1/2 cup' },
        { ingredient: 'Eggs', measurement: '3' },
      ],
      instructions: 'Mix, bake, and enjoy!',
    },
    {
      title: 'Pasta Salad',
      recipeImage: 'https://via.placeholder.com/400',
      ingredients: [
        { ingredient: 'Pasta', measurement: '3 cups' },
        { ingredient: 'Cherry Tomatoes', measurement: '1 cup' },
        { ingredient: 'Feta Cheese', measurement: '1/2 cup' },
      ],
      instructions: 'Mix all ingredients and chill before serving.',
    },
  ];

  return <RecipeBook recipes={mockRecipes} />;
};

export default App;
