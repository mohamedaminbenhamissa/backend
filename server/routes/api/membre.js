const express = require('express');
const router = express.Router();
const membresController = require('../../controllers/membre_controller');

/**
 * @swagger
 * /allmembre
 *   get:
 *     summary: Get a list of members
 *     description: Returns a list of all membre d'une formation
 *     responses:
 *       200:
 *         description: A list of all members
 */

  

router.get('/allmembre', membresController.getMembre);

//Route pour Données d'un utilisateur
router.get('/users/:membreId', membresController.MembreData)

// Route pour ajouter un membre
router.post('/formations/:formationId/membres', membresController.addMembre);

// Route pour mettre à jour un membre
router.put('/formations/:formationId/membres/:membreId', membresController.updateMembre);

// Route pour supprimer un membre
router.delete('/formations/:formationId/membres/:membreId', membresController.removeMembre);

// Route pour la progression  des membres
router.get('/progression',membresController.progressionMembre);


module.exports = router;
