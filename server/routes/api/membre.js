const express = require('express');
const router = express.Router();
const membresController = require('../../controllers/membre_controller');


router.get('/allmembre', membresController.getMembre);
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




//Route pour Données d'un utilisateur
router.get('/formations/:formationId/membres/:membreId', membresController.MembreData)


/**
 * @swagger
 *   http://localhost:3003/api/formations/{formationId}/membres/{membreId}:
 *   get:
 *     summary: Get member data
 *     description: Returns the data for a specific member in a formation
 *     parameters:
 *       - name: formationId
 *         in: path
 *         description: ID of the formation
 *         required: true
 *         type: string
 *       - name: membreId
 *         in: path
 *         description: ID of the member
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Data for the specified member
 *       404:
 *         description: Member not found
 */


// Route pour ajouter un membre
router.post('/formations/:formationId/membres', membresController.addMembre);



/**
 * @swagger
 *   http://localhost:3003/api/formations/{formationId}/membres:
 *   post:
 *     summary: Add a member
 *     description: Adds a new member to a formation
 *     parameters:
 *       - name: formationId
 *         in: path
 *         description: ID of the formation
 *         required: true
 *         type: string
 *     requestBody:
 *       description: Member object
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *          
 *     responses:
 *       201:
 *         description: Member added successfully
 *       400:
 *         description: Invalid member data
 *       404:
 *         description: Formation not found
 */

// Route pour mettre à jour un membre
router.patch('/formations/:formationId/membres/:membreId', membresController.updateMembre);

/**
 * @swagger
 *   http://localhost:3003/api/formations/{formationId}/membres/{membreId}:
 *   patch:
 *     summary: Update a member
 *     description: Updates the data for a specific member in a formation
 *     parameters:
 *       - name: formationId
 *         in: path
 *         description: ID of the formation
 *         required: true
 *         type: string
 *       - name: membreId
 *         in: path
 *         description: ID of the member
 *         required: true
 *         type: string
 *     requestBody:
 *       description: Member object
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:   
 *           
 *     responses:
 *       200:
 *         description: Member updated successfully
 *       400:
 *         description: Invalid member data
 *       404:
 *         description: Member or formation not found
 */


// Route pour supprimer un membre
router.delete('/formations/:formationId/membres/:membreId', membresController.removeMembre);


/**
 * @swagger
 *   http://localhost:3003/api/formations/{formationId}/membres/{membreId}:
 *   delete:
 *     summary: Remove a member
 *     description: Removes a specific member from a formation
 *     parameters:
 *       - name: formationId
 *         in: path
 *         description: ID of the formation
 *         required: true
 *         type: string
 *       - name: membreId
 *         in: path
 *         description: ID of the member
 *         required: true
 *         type: string
 */

// Route pour la progression  des membres
router.get('/progression',membresController.progressionMembre);


module.exports = router;
