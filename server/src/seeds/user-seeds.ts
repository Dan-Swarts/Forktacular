import { User} from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      userName: 'Paul', 
      intolerance: 'dairy', 
      diet: 'vegan', 
      favIngredients: 'cheese'
    }, 
    {
      userName: 'Jae',
      intolerance: 'dairy', 
      diet: 'vegan', 
      favIngredients: 'cheese'
    }, 
    {
      userName: 'Jessica',
      intolerance: 'dairy', 
      diet: 'vegan', 
      favIngredients: 'cheese'
    },
    {
      userName: 'Jennifer', 
      intolerance: 'dairy', 
      diet: 'vegan', 
      favIngredients: 'cheese'
    }
  ], { individualHooks: true})
}
