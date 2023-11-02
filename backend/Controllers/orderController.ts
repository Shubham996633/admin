import { Request, Response } from 'express';
import User from "../Models/orderModel"
import Order from '../Models/orderModel';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await User.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const createOrder = async (req: Request, res: Response) => {
    const { orderId, productName, productPrice, purchaseDate, purchasedUserId } = req.body;
    try {
      const order = await Order.create({
        orderId,
        productName,
        productPrice,
        purchaseDate,
        purchasedUserId
      });
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
};


export const updateOrder = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const { productName, productPrice, purchaseDate,purchasedUserId } = req.body;
  try {
    const [rowsUpdated, [updatedOrder]] = await Order.update(
      {
        productName,
        productPrice,
        purchaseDate,
        purchasedUserId
      },
      {
        where: { orderId: orderId },
        returning: true,
      }
    );

    if (rowsUpdated > 0) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error: any) {
    console.log(error);
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = error.errors.map((err: any) => err.message);

      res.status(400).json({ error: 'Validation error', details: errorMessages });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};


export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.orderId; 

  try {
    const order = await User.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};


  
export const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.orderId; // Extract userId from request params

  try {
    const order = await User.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};