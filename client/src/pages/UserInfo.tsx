
import { useState, useLayoutEffect, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authentication';
import { retrieveUser } from '../api/usersAPI'
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import AccountShowCase from '../components/AccountShowCase';


const UserInfo = () => {
  const [loginCheck,setLoginCheck] = useState(false);
  const [signIn,setSignIn] = useState(true);

  useLayoutEffect(() => {
    const checkLogin = async () => {
      if (await authService.loggedIn()) {
        setLoginCheck(true);
      }
    };
  
    checkLogin(); // Call the async function inside the synchronous effect.
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  // Async function fetchUsers retrieves user data 
  const fetchUser = async () => {
    // Call retrieveUser function which asynchronously fetches user data.
    const data = await retrieveUser(1);
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
          {signIn ? 'Sign In' : 'Sign Up'}
        </h2>
        {
          loginCheck
            ? <AccountShowCase setLoginCheck={setLoginCheck}></AccountShowCase>
            : signIn 
              ? <LoginForm setSignIn={setSignIn}></LoginForm>
              : <SignUpForm setSignIn={setSignIn}></SignUpForm>
        }
      </div>
    </div>
  );
};

export default UserInfo;
