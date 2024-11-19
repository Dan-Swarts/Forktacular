import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authentication';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import AccountShowCase from '../components/AccountShowCase';

const UserInfo = () => {
  const [loginCheck,setLoginCheck] = useState(false);


  const [signIn,setSignIn] = useState(true);

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
        {
          loginCheck
            ? <AccountShowCase setLoginCheck={setLoginCheck}></AccountShowCase>
            : signIn 
              ? <LoginForm></LoginForm>
              : <SignUpForm></SignUpForm>
        }
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
