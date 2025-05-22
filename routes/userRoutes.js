const express = require('express');
const userController = require('../controllers/userController');
// const { validateUser, validateUserId } = require('../validators/userDTO');

const router = express.Router();

/**
GET /api/users
Retrieves all users from the database.

GET /api/users/:id
Retrieves a specific user by ID.
@param {string} id - User ID

POST /api/users
Creates a new user.
Request body:
{
  name: string,
  password: string,
  company: string,
  position: string,
  email: string,
  phone: string
}

PUT /api/users/:id
Updates an existing user by ID.
@param {string} id - User ID
Request body:
{
  name: string,
  password: string,
  company: string,
  position: string,
  email: string,
  phone: string
}

DELETE /api/users/:id
Deletes a user by ID.
@param {string} id - User ID
 */

router.get('/', userController.getUsers);
router.post('/', /* validateUser, */ userController.createUser);
router.get('/:id', /* validateUserId, */ userController.getUser);
router.put('/:id', /* validateUser, */ userController.updateUser);
router.delete('/:id', /* validateUserId, */ userController.deleteUser);

module.exports = router;
