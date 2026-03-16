const express = require ('express')
const router = express.Router()
const sessionService = require('../services/session.service')

router.post('/start', (req, res) => {
    const result = sessionService.startSession()
    res.json(result)
})

module.exports = router