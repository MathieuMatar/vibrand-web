const express = require('express');
const userController = require('../controllers/userController');
//const { validateUser, validateUserId } = require('../validators/userDTO');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;