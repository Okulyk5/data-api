const express = require('express');
const kycController = require('../controllers/kyc');

const router = express();

router.post('/apply/:address', kycController.applyForKeyfiAccess);

module.exports = router;
