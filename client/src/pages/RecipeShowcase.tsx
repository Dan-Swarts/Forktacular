import { useContext } from 'react';
import { currentRecipeContext } from "../App";


export default function RecipeShowcase(){
    const { currentRecipeDetails } = useContext(currentRecipeContext);

    return (

        currentRecipeDetails 
            ? 
            <div>
                <h1>{currentRecipeDetails.title}</h1>
                <p>{currentRecipeDetails.summary}</p>
                <h1>{currentRecipeDetails.readInMinutes}</h1>
                <ul>
                    {currentRecipeDetails.ingredients}
                </ul>
                <p>{currentRecipeDetails.instructions}</p>
                <ul>
                    {currentRecipeDetails.steps}
                </ul>
                <ul>
                    {currentRecipeDetails.diets}
                </ul>
                <img src={currentRecipeDetails.image} alt="" />
            </div>
            

            : <div>404</div>
    )
}