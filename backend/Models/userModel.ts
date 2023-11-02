import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';
import Order from './orderModel';

class User extends Model {
  declare userId: number;
  declare firstName: string;
  declare lastName: string;
  declare emailAddress: string;
  declare password: number;
  declare updated_at: Date;
}

User.init(
  {
    userId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING(255),
      unique: false,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    tableName: 'users', // Replace 'users' with your actual table name
    timestamps: false,
  }
);

User.hasMany(Order, { foreignKey: 'purchasedUserId' });

export default User;
