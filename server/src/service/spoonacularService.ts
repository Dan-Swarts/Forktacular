interface searchInput {
    query: string,
    cuisine: string,
    excludeCuisine: string,
}


class spoonacularService {
    async findRecipes(input: searchInput){
        console.log(input);
        return input;
    }
};

export default new spoonacularService();