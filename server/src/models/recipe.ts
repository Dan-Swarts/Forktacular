import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface RecipeAttributes {
  id: number;
  title: string;
  summary: string;
  readyInMinutes: number; 
  servings: number; 
  instructions: string; 
  ingredients: string; 
  image: string; 
  spoonacular: boolean; 
  userId?: number;
}

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  public id!: number;
  public title!: string;
  public summary!: string;
  public readyInMinutes!: number; 
  public servings!: number; 
  public instructions!: string; 
  public ingredients!: string; 
  public image!: string; 
  public spoonacular!: boolean; 
  public userId!: number;

  // associated Volunteer model
  public readonly savedUser?: User;
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
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
      instructions: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      spoonacular: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'recipe',
      sequelize,
    }
  );

  return Recipe;
}
