/*
// db-sequelize.js
const { Sequelize } = require("sequelize");
require('dotenv').config();
const mysql2 = require("mysql2"); // Ensure mysql2 is used

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql', // ✅ Use mysql instead of mariadb
        dialectModule: mysql2,
        logging: false, // Or set to true or a custom logger
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

module.exports = sequelize;
*/

const {Sequelize} =  require("sequelize");
require('dotenv').config();
const mariadb = require("mariadb"); // Explicitly require mariadb

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mariadb',
        pool: {
            max: 10,
            min: 0,
            acquire: 3000,
            idle: 1000,
        },
        logging: true
    }
);

module.exports = sequelize;