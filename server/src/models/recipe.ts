import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js';

interface RecipeAttributes {
  id: number;
  name: string;
  description: string;
  userId?: number;
}

interface RecipeCreationAttributes extends Optional<RecipeAttributes, 'id'> {}

export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'work',
      sequelize,
    }
  );

  return Recipe;
}
