
const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.route('/admin-list').get(userController.getAllAdmins);
router.post('/register', userController.createAdmin);
router.get('/:_id', userController.getAdminById);
router.put('/update/:id',userController.updateAdmin);
router.delete('/delete/:id', userController.deleteAdmin);

module.exports = router;

