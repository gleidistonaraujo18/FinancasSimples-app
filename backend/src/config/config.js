require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE || "test",
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_CONNECTION || "mysql",
        timezone: process.env.DB_TIMEZONE || "UTC",
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_DATABASE,
        host: process.env.PROD_DB_HOST,
        port: process.env.PROD_DB_PORT,
        dialect: process.env.PROD_DB_CONNECTION,
        timezone: process.env.PROD_DB_TIMEZONE,
    },
};
