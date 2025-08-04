const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { default: uploadImage } = require('../middleware/uploadImage');

router.get('/', menuController.getAllMenuItems);
router.post('/',uploadImage, menuController.createMenuItem);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router; 