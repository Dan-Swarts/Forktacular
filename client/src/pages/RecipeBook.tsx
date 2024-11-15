import '../index.css';
import RecipeCard from '../components/RecipeCard';
import { useState, useEffect } from 'react';
import Recipe from '../types/recipe';
import apiService from '../api/apiService';


export default function RecipeBook() {
  const [recipes,setRecipes] = useState<Recipe[]>([]);

  const getRandomRecipes = async() => {
    const recipes = await apiService.forignRandomSearch();
    setRecipes(recipes);
  }

  useEffect(() => {
    getRandomRecipes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-amber-700 mb-8 text-center">My Recipe Book</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe}></RecipeCard>
        ))}
      </div>
    </div>
  );
};

