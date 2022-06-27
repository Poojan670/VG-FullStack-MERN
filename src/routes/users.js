const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/roles')
const { register, listUsers, getUser, updateUserRole } = require('../controllers/users')

router.post('/', register)

router.get('/', auth, listUsers)
router.get('/me', auth, getUser)
router.patch('/:id', [auth, isAdmin], updateUserRole)

module.exports = router;