const express = require('express')
require('express-async-errors');
const router = express.Router()
const auth = require('../../middleware/auth')
const upload = require('../utils/storage')
const detail = require('../controllers/userDetails')

router.post('/', auth, upload.single('userPhoto'), detail.createUserDetails)
router.patch('/:id', auth, detail.addUserDetail)
router.get('/', detail.listUserDetails)
router.get('/me', auth, detail.getuserDetail)

module.exports = router;