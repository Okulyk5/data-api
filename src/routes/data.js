const express = require('express')
const d = require('../controllers/data')

const router = express()

router.get('/rates', d.getDefiRates)
router.get('/assets', d.getDefiAssets)

module.exports = router
