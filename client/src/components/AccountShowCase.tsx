import { authService } from "../api/authentication";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface accountShowCaseProps{
    setLoginCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountShowCase({ setLoginCheck }: accountShowCaseProps){

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        'intolerance':'',
        'diet':'',
        'favIngredients':'',
    });

    const handleLogOut = () =>{
        authService.logout();
        navigate('/user-info');
        setLoginCheck(false);
    }

    const handleChange = (e: any) => {
        setFormValues({
          ...formValues,
          [e.target.id]: e.target.value
        });
    };

    const handleAccountUpdate = (e: any) => {
        e.preventDefault();
        console.log('formValues:', formValues)
    }

    return (
        <>
        <form onSubmit={handleAccountUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            diet
          </label>
          <input
            type="text"
            id="diet"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#ff9e40]"
            placeholder="Enter your diet"
            onChange={handleChange}
        />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            intolerance
          </label>
          <input
            type="password"
            id="intolerance"
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

            <button
                onClick={handleLogOut}
                >LOG OUT
            </button>
        </>
    )
}