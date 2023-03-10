const express = require('express');
const router = express.Router();

const membreController = require('../../controllers/membre_controller');

// Route to create a new member
router.post('/formations/:formationId/membres', membreController.createMembre);

// Route to update an existing member
router.put('/formations/:formationId/membres/:membreId', membreController.updateMembre);

// Route to delete an existing member
router.delete('/formations/:formationId/membres/:membreId', membreController.deleteMembre);

module.exports = router;
