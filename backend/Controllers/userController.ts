import { Request, Response } from 'express';
import User from "../Models/userModel"

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { userId, firstName, lastName, emailAddress, password } = req.body;
    try {
      const user = await User.create({
        userId,
        firstName,
        lastName,
        emailAddress,
        password
      });
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
};


export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { firstName, lastName, emailAddress,password } = req.body;
  try {
    const [rowsUpdated, [updatedUser]] = await User.update(
      {
        firstName,
        lastName,
        emailAddress,
        password
      },
      {
        where: { userId: userId },
        returning: true,
      }
    );

    if (rowsUpdated > 0) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
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


export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Extract userId from request params

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy(); // Delete the user
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Extract userId from request params

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};