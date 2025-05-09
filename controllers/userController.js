const UserService = require('../services/userService');

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserService.readUsers();
            res.json(users);
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getUser(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.readUser(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async createUser(req, res) {
        const { name, password, company, position, email, phone } = req.body;
        try {
            const newUser = await UserService.createUser(name, password, company, position, email, phone);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { name, password, company, position, email, phone } = req.body;
        try {
            const updatedUser = await UserService.updateUser(id, name, password, company, position, email, phone);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await UserService.deleteUser(id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = UserController;