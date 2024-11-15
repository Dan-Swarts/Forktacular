import dotenv from 'dotenv';
dotenv.config();
import searchInput from "../types/searchInput";

class spoonacularService {
    private baseURL?: string;
    private apiKey?: string;

    constructor() {
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey =process.env.SPOONACULAR_API_KEY || '';
    }

    async findRecipes(input: searchInput){

        try {
            let searchURL = `${this.baseURL}/recipes/complexSearch?apiKey=${this.apiKey}`;
            
            Object.entries(input).forEach(([key, value]) => {
                searchURL += `&${key}=${value}`;
            });

            const response = await fetch(searchURL);
            const recipes = await response.json();
            return recipes;

        } catch(error) {
            console.log(error);
            return null
        }
    }

    async findInformation(id: number){
        try {
            const searchURL = `${this.baseURL}/recipes/${id}/information?apiKey=${this.apiKey}`;
            const response = await fetch(searchURL);
            const information = await response.json();
            return information;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
};

export default new spoonacularService();