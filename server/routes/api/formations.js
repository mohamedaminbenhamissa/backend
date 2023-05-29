const express = require('express');
const router = express.Router();
const formationsController = require('../../controllers/formation_controller');

/**
 * @swagger
 * /api/formation/formations:
 *   get:
 *     summary: Get formation data
 *     description: Returns the data for a specific formation
 *     parameters:
 *       - name: formationId
 *         in: path
 *         description: ID of the formation
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Data for the specified formation
 *       404:
 *         description: Member not found
 */
router.get('/formations', formationsController.getFormations, (req, res) => {
  res.status(200).send(res.locals.formations);
});

module.exports = router;
