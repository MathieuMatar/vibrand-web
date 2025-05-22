const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db-sequelize');
const moment = require("moment");

class User extends Model {}

/**
 * User model
 * - name: string(100), required, cannot be empty
 * - password: string(100), required, cannot be empty
 * - company: integer, optional, foreign key to clients table
 * - position: string(50), optional
 * - email: string(100), optional, must be valid email format
 * - phone: string(20), optional
 * - timestamps: true (createdAt, updatedAt)
 */

User.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        company: {
            //relationship to Client primary key
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'clients',
                key: 'id',
            },
        },
        position: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },  
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
);

module.exports = User;