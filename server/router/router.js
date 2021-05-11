const express = require('express')
const router = express.Router()
const service = require('../render/render')
router.get('/', service.homeRoute)
module.exports = router