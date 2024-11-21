import RecipeDetails from "../interfaces/recipeDetails";
import { authService } from "./authentication";

// 1.  GET /api/recipes - Get all recipes
// Retrieve all recipes from the API
const retrieveRecipes = async () => {
    try {
      const response = await fetch('/api/recipes', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('invalid user API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval:', err);
      return [];
    }
  };
  
// 2. GET /api/recipes/:id - Get recipe by ID
// Retrieve a single recipe by ID from the API
const retrieveRecipe = async (id: number | undefined) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Invalid API response, check network tab!');
      }
  
      return data;
  
    } catch (err) {
      console.log('Error from recipe retrieval:', err);
      return {};
    }
  }

// 3. GET /api/recipes/users/:userId - Get recipeIds by userIds  
//Retrieve recipe IDs saved by a particular user ID via the API
const retrieveRecipeIdsByUserId = async (id: number | undefined) => {
    try {
      const response = await fetch(`/api/recipes/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Invalid API response, check network tab!');
      }
  
      return data;
  
    } catch (err) {
      console.log('Error from recipe retrieval:', err);
      return {};
    }
  }


// 4. GET api/users/:id/recipes - Get all recipes saved by a User
// Retrieve all recipes saved by a particular user ID via the API
const retrieveRecipesByUserId = async (id: number | undefined) => {
    try {
      const response = await fetch(`/api/users/${id}/recipes`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Invalid API response, check network tab!');
      }
  
      return data;
  
    } catch (err) {
      console.log('Error from recipe retrieval:', err);
      return {};
    }
  }


// 5. GET api/users/:id/recipes - Get all recipes saved by a User
// Retrieve all recipes saved by a particular user ID via the API
const retrieveRecipesByUser = async () => {
    const jwtToken = authService.getToken();
    try {
      const response = await fetch(`/api/users/userRecipes`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        },
    });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Invalid API response, check network tab!');
      }
  
      return data;
  
    } catch (err) {
      console.log('Error from recipe retrieval:', err);
      return {};
    }
  }

// 5. POST /api/recipes - Create new recipe
// Add a new recipe via POST request to the API
const addRecipeToDatabase = async (body: RecipeDetails) => {
    const jwtToken = authService.getToken();
    try {
      const response = await fetch(
        '/api/recipes/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(body)
        }
      )
      const data = await response.json();
      console.log("API response status:", response.status); // Log response status
      console.log("API response data:", data); // Log the full response data

      if (!response.ok) {
        throw new Error('Invalid API response, check network tab!');
      }
  
      return data;
  
    } catch (err) {
      console.log('Error from recipe creation: ', err);
      return Promise.reject('Could not create recipe');
    }
  }

  // 6. POST /api/recipes - Create new recipe
// Add a new recipe via POST request to the API
  const addRecipe = async (body: RecipeDetails) => {
    const jwtToken = authService.getToken();
    try {
      // First API call to create the recipe
      const response = await fetch('/api/recipes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      console.log("API response status (recipe creation):", response.status);
      console.log("API response data (recipe creation):", data);
  
      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }
  
      // Extract the recipe ID from the response
      const { id: recipeId } = data; // Assuming the response includes the recipe ID
      console.log("recipeID = " + recipeId); 
  
      if (!recipeId) {
        throw new Error('Recipe ID not returned from API');
      }
     
      // Second API call to save the recipe for the user
      const saveResponse = await fetch(`/api/users/save/recipe/${recipeId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
  
      const saveData = await saveResponse.json();
      console.log("API response status (save recipe):", saveResponse.status);
      console.log("API response data (save recipe):", saveData);
  
      if (!saveResponse.ok) {
        throw new Error('Failed to save recipe for user');
      }
  
      return saveData;
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error during recipe operations:', err.message);
        return Promise.reject(err.message);
      } else {
        console.error('Unknown error during recipe operations:', err);
        return Promise.reject('An unknown error occurred');
      }
    }
  };
  
 
  // 7. PUT /api/recipes/:id - Update recipe by ID
  // Update an existing recipe via PUT request to the API
  const updateRecipe = async (id: number | undefined, body: RecipeDetails) => {
    try {
      const response = await fetch(
        `/api/recipes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }
      )
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Invalid API response, check network tab!');
      }
  
      return data;
  
    } catch (err) {
      console.log('Error from recipe updating: ', err);
      return Promise.reject('Could not update recipe');
    }
  }
  
  // 8. DELETE /recipes/:id - Delete recipe by ID
  // Delete a recipe by ID via DELETE request to the API
  const deleteRecipe = async (id: number | undefined) => {
    try {
      const response = await fetch(
        `/api/recipes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
  
      if (!response.ok) {
        throw new Error('Invalid API response, check network tab!');
      }
  
      return;
  
    } catch (err) {
      console.log('Error from recipe deleting: ', err);
      return Promise.reject('Could not delete recipe');
    }
  }  

  export { retrieveRecipes, retrieveRecipe, retrieveRecipesByUser, addRecipe, addRecipeToDatabase, updateRecipe, deleteRecipe, retrieveRecipesByUserId, retrieveRecipeIdsByUserId};
  