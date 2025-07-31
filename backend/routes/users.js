const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { default: isExisted } = require('../middleware/isExisted');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser)
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/most-bought', userController.getMostBoughtUsers);
router.get('/me', isExisted, userController.getme);

module.exports = router; 