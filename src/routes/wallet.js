const express = require('express')
const w = require('../controllers/wallet')

const router = express()

router.get('/wallet/txlist', w.getWalletTxList)
router.get('/wallet/tokentx', w.getWalletTokenTx)

module.exports = router
