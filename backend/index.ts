import express from 'express';
import { connectToDatabase } from './utils/database';
import userRoutes from './Routes/userRoutes';
import orderRoutes from './Routes/orderRoute';
import userOrderRoutes from './Routes/userOrderRoute';
const cors = require('cors');
const app = express();


app.use(express.json()); 
app.use(cors());

app.use(express.urlencoded({ extended: true }));

connectToDatabase()
  .then(() => {
    app.use('/api', userRoutes);
    app.use("/api",orderRoutes)
    app.use("/api",userOrderRoutes)

    app.get('/', (req, res) => {
      res.send('Admin APIs!');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to establish a database connection:', error);
  });
