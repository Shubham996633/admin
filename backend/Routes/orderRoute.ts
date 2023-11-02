import express from 'express';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder, 
} from '../Controllers/orderController';

const router = express.Router();

router.post('/order', createOrder);
router.get('/order', getOrders); 
router.patch('/order/:orderId', updateOrder);
router.delete('/order/:orderId', deleteOrder);
router.get('/order/:orderId', getOrderById); 


export default router;
