const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/transaction_controller')


router.get('/transaction', transactionController.getTransaction);

module.exports = router;