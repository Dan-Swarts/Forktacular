import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  userName: string;
  userEmail: string;
  userPassword: string; 
  intolerance: string[];
  diet: string[];
  favIngredients: string[]; 
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public userName!: string;
  public userEmail!: string; 
  public userPassword!: string;  
  public intolerance!: string[]; 
  public diet!: string[]; 
  public favIngredients!: string[];
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
        validate: {
          len: [3, 50], // Minimum 3 and maximum 50 characters
        },
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
        validate: {
          isEmail: true, // Ensure it's a valid email
        },
      }, 
      userPassword: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      intolerance: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      }, 
      diet: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      }, 
      favIngredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
