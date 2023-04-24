const express = require('express');
const router = express.Router();
const formationsController = require('../../controllers/formation_controller');

router.route('/formations').
get( formationsController.getFormations, (req, res) => {
  
  res.status(200).send(res.locals.formations)
});
// router.get('/formations', formationsController.getFormations);

module.exports = router;