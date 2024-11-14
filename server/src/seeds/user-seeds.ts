import { User} from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      userName: 'Paul', 
      userEmail: 'paul@gmail.com',
      userPassword: '1234', 
      intolerance: ['dairy'], 
      diet: ['vegan'], 
      favIngredients: ['cheese']
    }, 
    {
      userName: 'Joe',
      userEmail: 'joe@gmail.com',
      userPassword: '1234', 
      intolerance: ['dairy'], 
      diet: ['vegan'], 
      favIngredients: ['cheese'],
    }, 
    {
      userName: 'Jessica',
      userEmail: 'jessica@gmail.com',
      userPassword: '1234', 
      intolerance: ['dairy'], 
      diet: ['vegan'], 
      favIngredients: ['cheese'],
    },
    {
      userName: 'Jennifer', 
      userEmail: 'jennifer@gmail.com',
      userPassword: '1234', 
      intolerance: ['dairy'], 
      diet: ['vegan'], 
      favIngredients: ['cheese']

    }
  ], { individualHooks: true})
}
