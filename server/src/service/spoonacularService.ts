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

        const url = `${this.baseURL}/recipes/complexSearch?api${this.apiKey}`;
        console.log(url);
        return input;
    }
};

export default new spoonacularService();