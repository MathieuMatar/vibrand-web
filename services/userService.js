const UserRepository = require('../repositories/userRepository');

/**
 * Provides user-related operations.
 *
 * @method readUsers
 * @returns {Promise<Object[]>} A promise resolving to a list of users.
 *
 * @method readUser
 * @param {number} id - User identifier.
 * @returns {Promise<Object>} A promise resolving to the user details.
 *
 * @method createUser
 * @param {string} name - The user's name.
 * @param {string} password - The user's password.
 * @param {string} company - The user's company.
 * @param {string} position - The user's position.
 * @param {string} email - The user's email address.
 * @param {string} phone - The user's phone number.
 * @returns {Promise<Object>} A promise resolving to the newly created user.
 *
 * @method updateUser
 * @param {number} id - The user identifier.
 * @param {string} name - The user's name.
 * @param {string} password - The user's password.
 * @param {string} company - The user's company.
 * @param {string} position - The user's position.
 * @param {string} email - The user's email address.
 * @param {string} phone - The user's phone number.
 * @returns {Promise<Object>} A promise resolving to the updated user.
 *
 * @method deleteUser
 * @param {number} id - The user identifier.
 * @returns {Promise<void>} A promise resolving when deletion is complete.
 *
 * @method authenticateUser
 * @param {string} name - The user's name.
 * @param {string} password - The user's password.
 * @returns {Promise<Object|null>} A promise resolving to the authenticated user or null if authentication fails.
 */

class UserService {
    static async readUsers() {
        return await UserRepository.readUsers();
    }

    static async readUser(id) {
        return await UserRepository.readUser(id);
    }

    static async createUser(name, password, company, position, email, phone) {
        return await UserRepository.createUser(name, password, company, position, email, phone);
    }

    static async updateUser(id, name, password, company, position, email, phone) {
        return await UserRepository.updateUser(id, name, password, company, position, email, phone);
    }

    static async deleteUser(id) {
        return await UserRepository.deleteUser(id);
    }

    static async authenticateUser(name, password) {
        const userlogin = await UserRepository.authenticateUser(name, password);
        return userlogin;
    }
}

module.exports = UserService;
