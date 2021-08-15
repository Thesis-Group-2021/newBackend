const express = require('express');
const instituteController = require('../controllers/institute.controller');
const router = express.Router();

router.get("/profiles", instituteController.getUserProfile)
router.post('/:username/add-profile', instituteController.createInstituteDetail)
router.route('/user-list').get(instituteController.getUser);
router.post('/register-user', instituteController.createUser);
router.get('/:_id', instituteController.getUserById);
router.put('/update/:id',instituteController.updateUser);
router.put('/updateProfile/:id', instituteController.updateProfile);
router.delete('/delete/:id', instituteController.deleteUser);
router.delete('/delete/:id',instituteController.deleteProfile);

module.exports = router;