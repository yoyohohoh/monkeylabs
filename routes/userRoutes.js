const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

router.get('/api/users/:id', userController.getUserById);
router.get('/api/users/:username', userController.getUserByUsername);
//router.get('/api/users', userController.getAllUsers);


router.post('/api/users', userController.createUser);

router.put('/api/users/:id', userController.updateUser);

router.delete('/api/users', userController.deleteAllUsers);

module.exports = router;
