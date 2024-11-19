import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveUser } from '../api/usersAPI'
//import type { UserDetails} from '../interfaces/UserDetails'


const UserInfo = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  // Async function fetchUsers retrieves user data 
  const fetchUser = async () => {
    // Call retrieveUser function which asynchronously fetches user data.
    const data = await retrieveUser("1");
    console.log(data); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef3d0]">
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
        Welcome
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
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#a84e24]">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>
        {isSignIn ? (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#ff9e40]"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#ff9e40]"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff9e40] text-white py-2 rounded hover:bg-[#e7890c]"
            >
              Sign In
            </button>
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#a84e24]"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#a84e24]"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#a84e24]"
                placeholder="Confirm your password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="allergies">
                Allergies/Intolerances
              </label>
              <input
                type="text"
                id="allergies"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#a84e24]"
                placeholder="List any allergies or intolerances"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="diet">
                Dieting (If any)
              </label>
              <input
                type="text"
                id="diet"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#a84e24]"
                placeholder="Specify your diet, e.g., vegan, keto"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#a84e24] text-white py-2 rounded hover:bg-[#9c401e]"
            >
              Sign Up
            </button>
          </form>
        )}
        <button
          className="mt-4 text-[#ff9e40] hover:underline focus:outline-none"
          onClick={() => setIsSignIn(!isSignIn)}
    
        >
          {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
