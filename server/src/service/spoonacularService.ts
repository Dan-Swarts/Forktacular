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
            const parsedRecipes = recipes.results.map((recipe: any) => {
                return {
                    spoonacularId:recipe.id,
                    image:recipe.image,
                    title:recipe.title,
                };
            });

            return parsedRecipes;

        } catch(error) {
            console.log(error);
            return null
        }
    }

    async findRandomRecipes() {
        try {
            const searchURL = `${this.baseURL}/recipes/random?number=10&apiKey=${this.apiKey}`;
            const response = await fetch(searchURL);
            const randomRecipes = await response.json();
            const recipes = this.parseRandomRecipes(randomRecipes);
            return recipes;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    parseRandomRecipes(randomRecipes: any) {
        const recipes = randomRecipes.recipes;
        const parsedRecipes = recipes.map((recipe: any) => {
            return {
                spoonacularId:recipe.id,
                image:recipe.image,
                title:recipe.title,
            };
        });
        return parsedRecipes;
    }

    async findInformation(id: number){
        try {
            const searchURL = `${this.baseURL}/recipes/${id}/information?apiKey=${this.apiKey}`;
            const response = await fetch(searchURL);
            const information = await response.json();
            const parsedInformation = this.parseInformation(information);
            return parsedInformation;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    async parseInformation(information: any){
        return {
            title: information.title,
            summary: information.summary,
            readyInMinutes: information.readyInMinutes,
            servings: information.servings,
            ingredients:information.extendedIngredients.map((ingredient: any) => {
                return `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
            }),
            instructions: information.instructions,
            steps: information.instructions.split('.'),
            diets: information.diets,
            image: information.image,
            sourceUrl: information.sourceUrl,
            spoonacularSourceUrl: information.spoonacularSourceUrl,
            spoonacularId: information.id,
        };
    }
};

export default new spoonacularService();