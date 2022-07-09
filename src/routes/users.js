const express = require('express');
require('express-async-errors');
const router = express.Router();
const auth = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/roles')
const user = require('../controllers/users')

router.post('/', user.registerUser)

router.get('/', [auth, isAdmin], user.listUsers)
router.get('/me', auth, user.getUser)
router.patch('/:id', [auth, isAdmin], user.updateUserRole)

router.get('/verify/:id', user.verifyUser)

router.delete('/:id', [auth, isAdmin], user.deleteUser)

module.exports = router;