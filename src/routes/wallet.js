const express = require('express')
require('express-async-errors');
const router = express.Router()
const wallet = require('../controllers/wallet')

router.post('/', wallet)

module.exports = router;