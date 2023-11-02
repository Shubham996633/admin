import express from 'express';
import {
  getOrdersByUserId
} from '../Controllers/userOrderController';

const router = express.Router();

router.get('/orderbyuser/:userId', getOrdersByUserId);



export default router;
