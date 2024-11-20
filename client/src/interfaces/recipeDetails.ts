export default interface RecipeDetails {
    id: number, 
    title: string,
    summary: string,
    readyInMinutes: number,
    servings: number,
    ingredients: string[],
    instructions: string,
    steps: string[],
    diets: string[],
    image: string,
    sourceUrl: string,
    spoonacularSourceUrl: string,
    spoonacularId: number
}