const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUserById);
app.get('/api/users/:username', getUserByUsername);

router.post('/api/users', userController.createUser);

router.put('/api/users/:id', userController.updateUser);

router.delete('/api/users', userController.deleteAllUsers);

module.exports = router;
