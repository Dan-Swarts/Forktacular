export default interface RecipeDetails {
    id?: number, 
    title: string,
    summary: string,
    readyInMinutes: number,
    servings: number,
    ingredients: string[],
    instructions: string,
<<<<<<< HEAD
    steps: string[] | null,
    diets?: string[]| null,
    image?: string | null,
=======
    steps: string[]| null,
    diets: string[]| null,
    image: string | null,
>>>>>>> 8da65e991d4aa6652e2b353fcab6c07447f4ac94
    sourceUrl?: string| null,
    spoonacularSourceUrl?: string| null,
    spoonacularId?: number| null,
}