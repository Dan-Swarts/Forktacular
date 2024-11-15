import { useState } from 'react';

const UserInfo = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef3d0]">
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
