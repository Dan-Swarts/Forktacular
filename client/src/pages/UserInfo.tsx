import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authentication';
import UserLogin from '../interfaces/UserLogin';

const UserInfo = () => {
  const [_loginCheck,setLoginCheck] = useState(false);

  const [formValues, setFormValues] = useState({
    userName: '',
    userPassword: '',
    userEmail: '',
  });

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value
    });
  };

  const [signIn,setSignIn] = useState(true);

  const handleLogin = (e: any) => {
    e.preventDefault();
    authService.login(formValues as UserLogin);
  }
  const handleSignUp = (e: any) =>{
    e.preventDefault();
    console.log('Form Values:', formValues);
  }

  useLayoutEffect(() => {
    if(authService.loggedIn()) {
      setLoginCheck(true);
    }
  }, []);
  const navigate = useNavigate();

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
          {signIn ? 'Sign In' : 'Sign Up'}
        </h2>
        {signIn ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="userName"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#ff9e40]"
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="userPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#ff9e40]"
                placeholder="Enter your password"
                onChange={handleChange}
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
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="userName"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#a84e24]"
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#a84e24]"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="userPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#a84e24]"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type="password"
                id="userPassword"
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
          onClick={() => setSignIn(!signIn)}
        >
          {signIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
