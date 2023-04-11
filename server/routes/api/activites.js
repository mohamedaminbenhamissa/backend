const express = require('express');
const router = express.Router();
const activitesController = require('../../controllers/activites_controller');


router.get('/activites', activitesController.getactivites);
  
  module.exports = router;