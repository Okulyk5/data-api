const express = require('express');
const kycController = require('../controllers/kyc');

const router = express();

router.get('/kyc', kycController.getAddresses);
router.post('/kyc/update/:address', kycController.updateAddressStatus);
router.post('/kyc/apply/:address', kycController.applyForKeyfiAccess);
// Deprecated
router.post('/apply/:address', kycController.applyForKeyfiAccess);

module.exports = router;
