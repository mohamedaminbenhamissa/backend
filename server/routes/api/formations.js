const express = require('express');
const router = express.Router();
const formationsController = require('../../controllers/formation_controller');

router.route('/formations').
get( formationsController.getFormations, (req, res) => {
  
  res.status(200).send(res.locals.formations)
});

module.exports = router;