import { seedVolunteers } from './volunteer-seeds.js';
import { seedWork } from './work-seeds.js';
import { seedUsers } from './user-seeds.js'; 
import { seedRecipes } from './recipe-seeds.js'
import sequelize from '../config/connection.js';


const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    console.log(('\n----- NEW LINE -----\n'))
    
    await seedUsers(); 
    console.log('\n----- USERS SEEDED -----\n');

    await seedRecipes(); 
    console.log('\n----- RECIPES SEEDED -----\n');

    await seedVolunteers();
    console.log('\n----- VOLUNTEERS SEEDED -----\n');
    
    await seedWork();
    console.log('\n----- WORK SEEDED -----\n');

    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
