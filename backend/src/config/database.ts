import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error: any) => {
        console.error('Unable to connect to the database:', error);
    });

export { sequelize, Sequelize };