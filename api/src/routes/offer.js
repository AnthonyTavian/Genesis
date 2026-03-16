const express = require('express')
const router = express.Router()
const offerService = require('../services/offer.service')

router.get('/current', (req, res) => {
  const { sessionId } = req.query
  
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId é obrigatório' })
  }

  const result = offerService.getCurrentOffer(sessionId)
  
  if (result.error) {
    return res.status(404).json(result)
  }

  res.json(result)
})

router.post('/decision', (req, res) => {
  const { sessionId, accepted } = req.body

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId é obrigatório' })
  }

  if (accepted === undefined || accepted === null) {
    return res.status(400).json({ error: 'accepted é obrigatório' })
  }

  const result = offerService.processDecision(sessionId, accepted)
  
  if (result.error) {
    return res.status(404).json(result)
  }

  res.json(result)
})

module.exports = router