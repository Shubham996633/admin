import express from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser, 
} from '../Controllers/userController';

const router = express.Router();

router.post('/user', createUser);
router.get('/user', getUsers); 
router.patch('/user/:userId', updateUser);
router.delete('/user/:userId', deleteUser);
router.get('/user/:userId', getUserById); // Route to get a user by userId


export default router;
