import sequelize from '../config/connection.js';

import { UserFactory } from './user.js'; 
import { RecipeFactory } from './recipe.js'; 

    const User = UserFactory(sequelize); 
    const Recipe = RecipeFactory(sequelize); 

    const UserRecipes = sequelize.define('UserRecipes', {}, { timestamps: false });

    User.belongsToMany(Recipe, { through: 'UserRecipes', onDelete: 'CASCADE' });
    Recipe.belongsToMany(User, { through: 'UserRecipes', onDelete: 'CASCADE' });
    

export { User, Recipe, UserRecipes };
