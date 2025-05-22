const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db-sequelize');
const moment = require("moment");

class Task extends Model { }

/**
 * Task model
 * - type: enum ['note', 'task'], optional, defaults to 'note'
 * - project_id: integer, optional, foreign key to Projects
 * - created_by: integer, optional, foreign key to Users
 * - assigned_to: integer, optional, foreign key to Users
 * - completed_by: integer, optional, foreign key to Users
 * - due_date: date (YYYY-MM-DD), optional, defaults to current date
 * - task_description: text, optional
 * - importance_level: enum ['Critical', 'High', 'Medium', 'Low', 'Optional'], optional
 */

Task.init(
    {
        type: {
            type: DataTypes.ENUM('note', 'task'),
            allowNull: true,
            defaultValue: 'note',
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Projects',
                key: 'id',
            },
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        assigned_to: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        completed_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        due_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: moment().format('YYYY-MM-DD'),
        },
        task_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        importance_level: {
            type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low', 'Optional'),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks',
    }
);

module.exports = Task;