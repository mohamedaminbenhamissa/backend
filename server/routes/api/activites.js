const express = require('express');
const router = express.Router();
const activitesController = require('../../controllers/activites_controller');


router.get('/activites', activitesController.getactivites);

/**
 * @swagger
 *    http://localhost:3003/api/activites:
 *   get:
 *     summary: Get activites data
 *     description: Returns the data for an activites
 *    
 *       
 *     responses:
 *       200:
 *         description: Data for the activites
 *       404:
 *         description: activites not found
 */
  
  module.exports = router;