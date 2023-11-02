import {Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize} from  '../utils/database'
import User from './userModel';

class Order extends Model {
    declare orderId: number;
    declare productName: string;
    declare productPrice: string;
    declare purchaseDate: Date;
    declare purchasedUserId: number;
    declare updated_at: Date;
  }
  
  Order.init(
    {
      orderId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true, // Add this line to make orderId unique
      },
    
      productName: {
        type: DataTypes.STRING(255),
        unique: false,
        allowNull: false,
      },
      productPrice: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      purchasedUserId: {
        type: DataTypes.NUMBER,
        unique:true
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      
    },
    {
      sequelize,
      tableName: 'orders', // Replace 'orders' with your actual table name
      timestamps: false,
    }
  );

 


  export default Order;
