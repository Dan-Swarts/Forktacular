import { User} from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      userName: 'Paul', 
      userEmail: 'paul@gmail.com',
      userPassword: '1234', 
      intolerance: ['dairy'], 
      diet: 'vegetarian', 
      favIngredients: ['kale']
    }, 
    {
      userName: 'Joe',
      userEmail: 'joe@gmail.com',
      userPassword: '1234', 
      intolerance: ['dairy'], 
      diet: 'vegetarian', 
      favIngredients: ['rosemary'],
    }, 
    {
      userName: 'Jessica',
      userEmail: 'jessica@gmail.com',
      userPassword: '1234', 
      intolerance: ['dairy'], 
      diet: 'vegetarian', 
      favIngredients: ['garlic'],
    },
    {
      userName: 'Jennifer', 
      userEmail: 'jennifer@gmail.com',
      userPassword: '1234', 
      intolerance: ['dairy'], 
      diet: 'vegetarian', 
      favIngredients: ['onion']

    }
  ], { individualHooks: true})
}
