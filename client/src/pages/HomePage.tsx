import { useNavigate } from 'react-router-dom';
import '../index.css';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../interfaces/recipe';
import { useState, useLayoutEffect} from 'react';
import { authService } from '../api/authentication';
import apiService from '../api/apiService';

const HomePage = () => {
  const navigate = useNavigate();
  const [loginCheck,setLoginCheck] = useState(false);
  const [recipes,setRecipes] = useState<Recipe[]>([]);

  const getRandomRecipes = async() => {
    const recipes = await apiService.forignRandomSearch();
    setRecipes(recipes);
  }

  // useLayoutEffect( async () => {
  //   if( await authService.loggedIn()) {
  //     setLoginCheck(true);
  //   }
  // }, []);

  useLayoutEffect(() => {
      getRandomRecipes();

    const checkLogin = async () => {
      if (await authService.loggedIn()) {
        setLoginCheck(true);
      }
    };
    checkLogin(); // Call the async function inside the synchronous effect.
  }, []);

  return (
    <div className="min-h-screen bg-[#fef3d0]">
      {/* Navbar */}
      <nav className="bg-[#f5d3a4] shadow-md fixed top-0 w-full flex justify-between items-center px-4 py-2">
        {/* Forktacular button on the left */}
        <button
          onClick={() => navigate('/')}
          className="text-[#a84e24] hover:text-[#b7572e] font-semibold"
        >
          Forktacular
        </button>

        {/* Title centered */}
        <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">
          Home
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

      {/* Main Content */}

      {
        !loginCheck 
          ? (
              <div className='login-notice'>
                  <br />
                  <br />
                  <br />
                  <br />
                  <h1>
                      Login to view all your recipies!
                  </h1>

                  <div className="pt-20 px-4"> {/* Added padding-top to avoid overlap with fixed navbar */}
                  <h1 className="text-4xl font-bold text-[#a84e24] mb-8 text-center">Sample Recipes</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted gap */}
                    {recipes.map((recipe) => 
                      <RecipeCard recipe={recipe}></RecipeCard>
                    )}
                    
                  </div>
                  </div>
              </div>
              
              
            )

          : (<div className="pt-20 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/search')}
              className="bg-[#ff9e40] text-white p-6 rounded-lg shadow hover:bg-[#e7890c]"
            >
              Go to Search Page
            </button>
            <button
              onClick={() => navigate('/recipe-book')}
              className="bg-[#6fbf73] text-white p-6 rounded-lg shadow hover:bg-[#52a457]"
            >
              Go to Recipe Book
            </button>
            <button
              onClick={() => navigate('/recipe-maker')}
              className="bg-[#be72c1] text-white p-6 rounded-lg shadow hover:bg-[#a854b2]"
            >
              Go to Recipe Maker
            </button>
          </div>

          {/* Content */}
        <div className="pt-20 px-4"> {/* Added padding-top to avoid overlap with fixed navbar */}
          <h1 className="text-4xl font-bold text-[#a84e24] mb-8 text-center">Save New Recipes to Your Recipe Book</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted gap */}
            {recipes.map((recipe) => 
              <RecipeCard recipe={recipe}></RecipeCard>
            )}
            
                </div>
              </div>
            </div>
       
      )} 
    </div>
  );
};

export default HomePage;

