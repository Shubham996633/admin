import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://postgres:963369@localhost:5432/admin?schema=public') // Example for postgres


async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    // You can add more database initialization or sync operations here if needed.
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize, connectToDatabase };
