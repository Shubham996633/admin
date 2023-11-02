import { Request, Response } from 'express';
import User from "../Models/userModel"
import Order from '../Models/orderModel';

export const getOrdersByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Assuming you have a route parameter for userId

  try {
    const user = await User.findByPk(userId, {
      include: [Order],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const orders = user; // Corrected line
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
