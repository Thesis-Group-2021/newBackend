const express = require('express');

const clientController = require('../controllers/client.controller');
const router = express.Router();

router.get("/profiles", clientController.getUserProfile)
router.post("/:username/add-profile", clientController.createClientProfile);
router.put('/updateProfile/:id', clientController.updateProfile);

module.exports = router;