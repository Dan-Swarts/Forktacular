import { useState } from "react";
import { authService } from "../api/authentication";
import UserLogin from "../interfaces/UserLogin";

export default function SignUpForm(){

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

    const handleSignUp = (e: any) =>{
        e.preventDefault();
        authService.signUp(formValues as UserLogin);
      }



    return (

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
    )
      
}