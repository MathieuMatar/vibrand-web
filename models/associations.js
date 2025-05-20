
const sequelize = require('../config/db-sequelize');
const Project = require('./Project');
const Employee = require('./Employee');
const Contact = require('./Contact');
const Service = require('./Service');
const Milestone = require('./Milestone');
const Task = require('./Task');
const User = require('./User');
const Client = require('./Client');

//User.hasMany(Order, {foreignKey: 'user_id', onDelete: 'CASCADE'});
//Order.belongsTo(User, {foreignKey: 'user_id'});
Project.belongsToMany(Employee, { through: 'ProjectEmployee' });
Employee.belongsToMany(Project, { through: 'ProjectEmployee' });

//contact and project many to many
Contact.belongsToMany(Project, { through: 'ProjectContact' });
Project.belongsToMany(Contact, { through: 'ProjectContact' });

//projectservice
Project.belongsToMany(Service, { through: 'ProjectService' });
Service.belongsToMany(Project, { through: 'ProjectService' });

//user project many to many
User.belongsToMany(Project, { through: 'UserProject' });
Project.belongsToMany(User, { through: 'UserProject' });


//milestoner belongs to project
Milestone.belongsTo(Project, { foreignKey: 'project_id' });
//project has many milestones
Project.hasMany(Milestone, { foreignKey: 'project_id' });




Task.belongsTo(Project, { foreignKey: 'project_id' });
Task.belongsTo(User, { foreignKey: 'created_by' });
Task.belongsTo(User, { foreignKey: 'assigned_to' });
Task.belongsTo(User, { foreignKey: 'completed_by' });

//project has many tasks
Project.hasMany(Task, { foreignKey: 'project_id' });
//User has many tasks
User.hasMany(Task, { foreignKey: 'created_by' });
User.hasMany(Task, { foreignKey: 'assigned_to' });
User.hasMany(Task, { foreignKey: 'completed_by' });







const syncDB = async () => {
    await sequelize.sync({alter: true});
    console.log("All tables have been created");
}

//module.exports = {User, Order, syncDB, sequelize}
module.exports = { Project, Employee, Contact, Service, Milestone, Task, User, syncDB, sequelize }
