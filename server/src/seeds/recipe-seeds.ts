import { Recipe } from '../models/index.js';

export const seedWork = async () => {
  await Recipe.bulkCreate([
    {
      name: 'Help the elderly', status: 'TODO', description: 'Help grandma cross the street', assignedVolunteerId: 1
    },
    {
      name: 'Sell Lemonade', status: 'IN PROGRESS', description: 'Raise funds for Girl Scout', assignedVolunteerId: 2
    },
    {
      name: 'Pick up groceries', status: 'DONE', description: 'Help out with groceries for the community', assignedVolunteerId: 3
    },
    {
      name: 'Work at the soup kitchen', status: 'TODO', description: 'Help feed the homeless at the Soup Kitchen', assignedVolunteerId: 4
    },
    {
      name: 'Mow lawn', status: 'IN PROGRESS', description: 'Head to the communities and mow lawns for people in need', assignedVolunteerId: 2
    },
    {
      name: 'Take care of farm', status: 'DONE', description: 'feed the cows, pet the chickens, and sing with the pigs', assignedVolunteerId: 3
    },
    {
      name: 'Dog walk', status: 'TODO', description: 'Walk the dogs and praise the cats!', assignedVolunteerId: 4
    }
  ]);
};



"id": 658782,
"title": "Rosemary and Red Onion Focaccia",
"readyInMinutes": 45,
"servings": 16,
"sourceUrl": "https://www.foodista.com/recipe/8PZLGG3C/rosemary-and-red-onion-focaccia",
"image": "https://img.spoonacular.com/recipes/658782-556x370.jpg",
"imageType": "jpg",
"summary": "Rosemary and Red Onion Focaccian is a bread that serves 16. One portion of this dish contains approximately <b>3g of protein</b>, <b>3g of fat</b>, and a total of <b>141 calories</b>. For <b>16 cents per serving</b>, this recipe <b>covers 5%</b> of your daily requirements of vitamins and minerals. It is a <b>very reasonably priced</b> recipe for fans of Mediterranean food. 1 person were impressed by this recipe. It is brought to you by Foodista. If you have lemon zest, rosemary, olive oil, and a few other ingredients on hand, you can make it. It is a good option if you're following a <b>dairy free and lacto ovo vegetarian</b> diet. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. With a spoonacular <b>score of 49%</b>, this dish is good. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/rosemary-and-red-onion-focaccia-80012\">Rosemary And Red Onion Focaccia</a>, <a href=\"https://spoonacular.com/recipes/rosemary-and-red-onion-focaccia-551751\">Rosemary and Red Onion Focaccia</a>, and <a href=\"https://spoonacular.com/recipes/rosemary-and-red-onion-focaccia-506954\">Rosemary and Red Onion Focaccia</a>.",
