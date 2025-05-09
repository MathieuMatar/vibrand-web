const { User, Project, Task } = require('../models/associations');

class UserRepository {
    static async readUsers() {
        try {
            const users = await User.findAll({
                include: [
                    { model: Project },
                    { model: Task}
                ]
            });
            console.log("hello", users);
            return users;
        } catch (error) {
            console.error("Error reading users:", error);
            return { success: false, message: "Failed to read users." };
        }
    }

    static async readUser(id) {
        try {
            const user = await User.findByPk(id,
                {
                    include: [
                        { model: Project },
                        { model: Task }
                    ]
                }
            );
            return user;
        } catch (error) {
            console.error("Error reading user:", error);
            return { success: false, message: "Failed to read user." };
        }
    }

    static async createUser(name, password, company, position, email, phone) {
        try {
            const createdUser = await User.create(
                { name, password, company, position, email, phone }
            );
            return createdUser;
        } catch (error) {
            console.error("Error creating user:", error);
            return { success: false, message: "Failed to create user." };
        }
    }

    static async updateUser(id, name, password, company, position, email, phone) {
        try {
            await User.update(
                { name, password, company, position, email, phone },
                { where: { id } }
            );
            return { success: true };
        } catch (error) {
            console.error("Error updating user:", error);
            return { success: false, message: "Failed to update user." };
        }
    }
    
    static async deleteUser(id) {
        try {
            await User.destroy({ where: { id } });
            return { success: true };
        } catch (error) {
            console.error("Error deleting user:", error);
            return { success: false, message: "Failed to delete user." };
        }
    }
}
module.exports = UserRepository;