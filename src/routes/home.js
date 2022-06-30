const express = require('express')
require('express-async-errors');
const router = express.Router()
const { home } = require('../controllers/home')
const { login } = require('../utils/auth')


router.get('/', home);
router.post('/api/login', login)

module.exports = router;