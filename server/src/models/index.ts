import sequelize from '../config/connection.js';
import { VolunteerFactory } from './volunteer.js';
import { WorkFactory } from './work.js';

import { UserFactory } from './user.js'; 
import { RecipeFactory } from './recipe.js'; 

    const Volunteer = VolunteerFactory(sequelize);
    const Work = WorkFactory(sequelize);

    const User = UserFactory(sequelize); 
    const Recipe = RecipeFactory(sequelize); 

    Volunteer.hasMany(Work, { foreignKey: 'assignedVolunteerId'});
    Work.belongsTo(Volunteer, { foreignKey: 'assignedVolunteerId', as: 'assignedVolunteer'});

    User.belongsToMany(Recipe, { through: 'UserRecipe'});
    Recipe.belongsToMany(User, { through: 'UserRecipe'}); 


export { Volunteer, Work, User, Recipe };
