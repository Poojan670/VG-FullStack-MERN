const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const upload = require('../utils/storage')
const { post, list, get } = require('../controllers/userDetails')

router.post('/', upload.single('userPhoto'), post)
router.get('/', list)
router.get('/me', auth, get)

module.exports = router;