import { authService } from "../api/authentication";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import apiService from "../api/apiService";

interface accountShowCaseProps{
    setLoginCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

interface accountInfo {
    diet?:string,
    intolerance?:string,
    favIngredients?:string,
}

export default function AccountShowCase({ setLoginCheck }: accountShowCaseProps){

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        diet:'',
        intolerance:'',
        favIngredients:'',
    });

    useLayoutEffect(() => {
        const getInfo = async () => {
            const accountInfo:accountInfo = await apiService.getAccountInformation();
            setFormValues({
                diet: accountInfo.diet? accountInfo.diet : '',
                intolerance: accountInfo.intolerance? accountInfo.intolerance : '',
                favIngredients: accountInfo.favIngredients? accountInfo.favIngredients : '',
            });
        }
        getInfo();
    },[]);

    const handleLogOut = () => {
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
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <form onSubmit={handleAccountUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="diet">
              Diet
            </label>
            <select
              id="diet"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              onChange={handleChange}
            >
              <option value="">Select a diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="paleo">Paleo</option>
              <option value="keto">Keto</option>
              <option value="mediterranean">Mediterranean</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="intolerance">
              Intolerance
            </label>
            <select
              id="intolerance"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              onChange={handleChange}
            >
              <option value="">Select an intolerance</option>
              <option value="dairy">Dairy</option>
              <option value="gluten">Gluten</option>
              <option value="nuts">Nuts</option>
              <option value="soy">Soy</option>
              <option value="shellfish">Shellfish</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Update Preferences
            </button>
          </div>
        </form>

        <div className="mt-6">
          <button
            onClick={handleLogOut}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Log out
          </button>
        </div>
      </div>
    )
}