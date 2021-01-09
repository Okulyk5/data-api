const express = require('express')
const g = require('../controllers/gas')

const router = express()

router.get('/gas/rates', g.getGasRates)

module.exports = router
