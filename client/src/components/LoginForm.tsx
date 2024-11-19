import { useState } from "react";
import { authService } from "../api/authentication";
import UserLogin from "../interfaces/UserLogin";

export default function LoginForm(){

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

    const handleLogin = (e: any) => {
      e.preventDefault();
      authService.login(formValues as UserLogin);
    }

    return (
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
    )
}