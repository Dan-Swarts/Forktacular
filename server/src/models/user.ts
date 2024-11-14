import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  userName: string;
  intolerance: string;
  diet: string;
  favIngredients: string; 
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public userName!: string;
  public intolerance!: string; 
  public diet!: string; 
  public favIngredients!: string;
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      intolerance: {
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      diet: {
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      favIngredients: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      tableName: 'user',
      sequelize,
    }
  );

  return User;
}
