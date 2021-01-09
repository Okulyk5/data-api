const express = require('express')
const a = require('../controllers/auth')

const router = express()

router.get('/auth/challenge', a.getChallenge)
router.post('/auth/verify', a.postVerify)

module.exports = router
