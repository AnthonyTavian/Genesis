const express = require('express')
const router = express.Router()
const rescueService = require('../services/rescue.service')

router.get('/history', (req, res) => {
  const result = rescueService.getHistory()
  res.json(result)
})

module.exports = router