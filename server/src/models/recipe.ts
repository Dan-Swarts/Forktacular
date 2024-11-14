import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
//import { User } from './user.js';

interface RecipeAttributes {
  id: number;
  title: string;
  summary: string;
  readyInMinutes: number; 
  servings: number; 
  ingredients: string[]; 
  instructions: string; 
  steps: string[]; 
  image: string; 
  sourceUrl: string; 
  spoonacularId: number; 
  spoonacularSourceUrl: string; 
}

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  public id!: number;
  public title!: string;
  public summary!: string;
  public readyInMinutes!: number; 
  public servings!: number; 
  public ingredients!: string[]; 
  public instructions!: string;
  public steps!: string[];  
  public image!: string; 
  public sourceUrl!: string; 
  public spoonacularId!: number; 
  public spoonacularSourceUrl!: string; 

}

export function RecipeFactory(sequelize: Sequelize): typeof Recipe {
  Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      readyInMinutes: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
      }, 
      servings: {
        type: DataTypes.INTEGER, 
        allowNull: true,
      }, 
      ingredients: {
        type: DataTypes.ARRAY(DataTypes.TEXT), 
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      steps: {
        type: DataTypes.ARRAY(DataTypes.TEXT), 
        allowNull: false, 
      },
      image: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      sourceUrl: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      spoonacularId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spoonacularSourceUrl: {
        type: DataTypes.STRING, 
        allowNull: true,
      }
    },
    {
      tableName: 'recipe',
      sequelize,
    }
  );

  return Recipe;
}
