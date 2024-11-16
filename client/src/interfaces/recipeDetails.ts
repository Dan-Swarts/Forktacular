export default interface RecipeDetails {
    title: string,
    summary: string,
    readInMinutes: number,
    servings: number,
    ingredients: string[],
    instructions: string,
    steps: string[],
    diets: any[],
    image: string,
    sourceUrl: string,
    spoonacularSourceUrl: string,
    spoonacularId: number,
}