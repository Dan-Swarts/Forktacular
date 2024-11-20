import '../index.css';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../interfaces/recipe';
import apiService from '../api/apiService';
import { useState, useEffect } from 'react';
import { retrieveRecipesByUserId } from '../api/recipesAPI'


export default function RecipeBook() {
  const navigate = useNavigate();

  const [recipes,setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRecipes = await retrieveRecipesByUserId(1);
      if (userRecipes && userRecipes.length > 0) {
        setRecipes(userRecipes); 
      } else {
        // Call a different function if no recipes exist
        const randomRecipes = await apiService.forignRandomSearch();
        setRecipes(randomRecipes);
      }
    };
  
    fetchData();
  }, []); 
  
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
        {recipes.map((recipe) => 
          <RecipeCard recipe={recipe}></RecipeCard>
        )}
        
      </div>
    </div>
  </div>
  );
};