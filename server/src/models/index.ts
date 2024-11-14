import sequelize from '../config/connection.js';
import { VolunteerFactory } from './volunteer.js';
import { WorkFactory } from './work.js';

import { UserFactory } from './user.js'; 
import { RecipeFactory } from './recipe.js'; 

    const Volunteer = VolunteerFactory(sequelize);
    const Work = WorkFactory(sequelize);

    Volunteer.hasMany(Work, { foreignKey: 'assignedVolunteerId'});
    Work.belongsTo(Volunteer, { foreignKey: 'assignedVolunteerId', as: 'assignedVolunteer'});

    const User = UserFactory(sequelize); 
    const Recipe = RecipeFactory(sequelize); 

    User.hasMany(Recipe, { foreignKey: 'userId' });
    Recipe.belongsTo(User, { foreignKey: 'userId', as: 'savedUser'}); 

export { Volunteer, Work, User, Recipe };
