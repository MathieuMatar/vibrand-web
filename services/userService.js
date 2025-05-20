const UserRepository = require('../repositories/UserRepository');

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
