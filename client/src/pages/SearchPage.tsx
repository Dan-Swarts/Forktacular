import { useState, useCallback, } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Recipe from '../interfaces/recipe';
import RecipeCard from '../components/RecipeCard'; 
import apiService from '../api/apiService';


const RecipeSearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Track the search query
  const [results, setResults] = useState<Recipe[]>([]); // Store the search results
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const navigate = useNavigate();


  const handleChange = async (e: any) => {
    // the query is changed instantly, and the api search is debounced
    const queryText = e.target.value;
    setQuery(queryText);
    if (queryText.trim() === '') {
      setResults([]);
      return;
    }
    debouncedHandleSearch(queryText)
  }

  const debounce = (mainFunction: any, delay: number) => {
    // Declare a variable called 'timer' to store the timer ID
    let timer: any;
  
    // Return an anonymous function that takes in any number of arguments
    return function (...args: any) {
      // Clear the previous timer to prevent the execution of 'mainFunction'
      clearTimeout(timer);
  
      // Set a new timer that will execute 'mainFunction' after the specified delay
      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };

  const handleSearch = async (queryText: string) => {
    setLoading(true);
    const searchParams = {
      query: queryText
    }
    const recipes = await apiService.forignRecipeSearch(searchParams);
    // console.log(recipes);
    setResults(recipes);
    setLoading(false);
  };
  
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

  return (
    <div className="min-h-screen bg-[#fef3d0]">
      {/* Navbar */}
      <nav className="bg-[#f5d3a4] shadow-md fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-2 max-w-7xl mx-auto z-10">
        <button
          onClick={() => navigate('/')}
          className="text-[#a84e24] hover:text-[#b7572e] font-semibold"
        >
          Forktacular
        </button>

        <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">
          Recipe Search
        </div>

        <div className="flex space-x-4">
          <button onClick={() => navigate('/recipe-book')} className="text-[#a84e24] hover:text-[#b7572e]">Recipe Book</button>
          <button onClick={() => navigate('/recipe-maker')} className="text-[#a84e24] hover:text-[#b7572e]">Recipe Maker</button>
          <button onClick={() => navigate('/user-info')} className="text-[#a84e24] hover:text-[#b7572e]">Account</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4">
        {/* Search Bar and Filter Button */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#ff9e40]"
            placeholder="Search for recipes..."
            value={query}
            onChange={handleChange}
          />
          <button className="ml-2 bg-[#ff9e40] text-white px-4 py-2 rounded-md hover:bg-[#e7890c] transition-colors">
            Filter
          </button>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            !results
              ? <p>something went wrong...</p>
              : results.length=== 0
                ? (
                <p>No results found...</p>
                )
                : (
                  results.map((recipe) => (
                    <RecipeCard recipe={recipe} />
                  ))
                )
              )}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearchPage;