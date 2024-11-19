import { useState } from "react";
import { authService } from "../api/authentication";
import UserLogin from "../interfaces/UserLogin";

interface loginFormProps{
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ setSignIn }: loginFormProps){

  const [formValues, setFormValues] = useState({
    userName: '',
    userPassword: '',
    userEmail: '',
  });
  const [errorMessage,setErrorMessage] = useState('');

    const handleChange = (e: any) => {
      setFormValues({
        ...formValues,
        [e.target.id]: e.target.value
      });
    };

    const handleLogin = async (e: any) => {
      e.preventDefault();
      const response = await authService.login(formValues as UserLogin);
      if(response.error){
        setErrorMessage('Error: Authentication Failed.');
      }
    }

    const checkEmail = (e: any) => {
      const inputEmail = e.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(inputEmail === '') {
        setErrorMessage('Please enter an email.');
      } else if (!emailRegex.test(inputEmail)){
        setErrorMessage('Please enter a valid email.');
      } else {
        setErrorMessage('');
      }
    }

    const checkPassword = (e:any) => {
      const inputPassword = e.target.value;
      if(inputPassword === ''){
        setErrorMessage('Please enter a password.');
      } else {
        setErrorMessage('');
      }
    }

    return (
      <>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="userEmail"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#ff9e40]"
              placeholder="Enter your username"
              onChange={handleChange}
              onBlur={checkEmail}
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
              onBlur={checkPassword}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff9e40] text-white py-2 rounded hover:bg-[#e7890c]"
          >
            Sign In
          </button>

          <p className="text-red-500 font-medium mt-2 text-sm">{errorMessage}</p>
        </form>

        <button
          className="mt-4 text-[#ff9e40] hover:underline focus:outline-none"
          onClick={() => setSignIn(false)}>
          Need an account? Sign Up   
        </button>
      </>
    )
}