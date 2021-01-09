const express = require('express')
const a = require('../controllers/alert')
const {auth} = require('./handlers')

const router = express()

router.get('/alert/:id', auth, a.getAlert)
router.post('/alert', auth, a.postAlert)
router.patch('/alert/:id', auth, a.patchAlert)
router.delete('/alert/:id', auth, a.deleteAlert)

module.exports = router
