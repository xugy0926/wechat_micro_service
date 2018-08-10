const express = require('express')
const { goto } = require('../middleware/proxy')

const router = express.Router()

router.post('/signup', goto)
router.post('/signin', goto)

module.exports = router
