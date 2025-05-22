const UserService = require('../services/userService');

/**
 * Controller for handling user-related operations.
 *
 * @class UserController
 */

/**
 * Retrieves a list of users.
 *
 * @async
 * @function getUsers
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Returns a Promise that resolves with the list of users or an error message.
 * @throws {Error} An error occurred while retrieving the users.
 */

/**
 * Retrieves a specific user by their unique identifier.
 *
 * @async
 * @function getUser
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {string|number} req.params.id - The unique identifier of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Returns a Promise that resolves with the user details or an error message.
 * @throws {Error} An error occurred while retrieving the user.
 */

/**
 * Creates a new user.
 *
 * @async
 * @function createUser
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request payload containing user details.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {string} req.body.company - The company of the user.
 * @param {string} req.body.position - The position of the user.
 * @param {string} req.body.email - The email address of the user.
 * @param {string} req.body.phone - The phone number of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Returns a Promise that resolves once the user is created or with an error message.
 * @throws {Error} An error occurred while creating the user.
 */

/**
 * Updates an existing user.
 *
 * @async
 * @function updateUser
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {string|number} req.params.id - The unique identifier of the user to be updated.
 * @param {Object} req.body - The request payload containing updated user details.
 * @param {string} req.body.name - The updated name of the user.
 * @param {string} req.body.password - The updated password of the user.
 * @param {string} req.body.company - The updated company of the user.
 * @param {string} req.body.position - The updated position of the user.
 * @param {string} req.body.email - The updated email address of the user.
 * @param {string} req.body.phone - The updated phone number of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Returns a Promise that resolves once the user is updated or with a 404 error if not found.
 * @throws {Error} An error occurred while updating the user.
 */

/**
 * Deletes a user.
 *
 * @async
 * @function deleteUser
 * @memberof UserController
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {string|number} req.params.id - The unique identifier of the user to be deleted.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Returns a Promise that resolves once the user is deleted or with a 404 error if not found.
 * @throws {Error} An error occurred while deleting the user.
 */

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
