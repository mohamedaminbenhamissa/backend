const express = require('express');
const router = express.Router();
const commentaireController = require('../../controllers/commentaire_controller');

router.get('/formations/:formationId/commentaires', commentaireController.getCommentaires);

/**
 * @swagger
 * /formations/:formationId/commentaires:
 *   get:
 *     summary: Get commentaires data
 *     description: Returns the data for a commentaires
 *     parameters:
 *       - name: formationId
 *         in: path
 *         description: ID of the formation
 *         required: true
 *         type: string
 *       
 *     responses:
 *       200:
 *         description: Data for the commentaires
 *       404:
 *         description: commentaires not found
 */

module.exports = router;