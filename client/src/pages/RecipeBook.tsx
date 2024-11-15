import React from 'react';
import '../index.css';

const RecipeBook = ({ recipes }) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">My Recipe Book</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recipes.map((recipe: { recipeImage: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; ingredients: any[]; }, index: React.Key | null | undefined) => (
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

            <div className="p-6 bg-gradient-to-r from-amber-50 to-white">
              {/* Recipe Title */}
              <h2 className="text-2xl font-bold text-amber-800 mb-3">{recipe.title}</h2>

              {/* Ingredients */}
              <h3 className="text-lg font-semibold text-amber-700 mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside mb-4 space-y-1">
                {recipe.ingredients.map((item: { measurement: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; ingredient: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => (
                  <li key={idx} className="text-gray-800">
                    {item.measurement} {item.ingredient}
                  </li>
                ))}
              </ul>

              {/* View Recipe Button */}
              <button className="mt-4 w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 rounded-md hover:from-teal-600 hover:to-teal-800 transition-colors">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

// Example usage with mock data (Replace with actual recipe data from storage or state)
const App = () => {
  const mockRecipes = [
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
